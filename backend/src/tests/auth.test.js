const request = require('supertest');
const app = require('../server');  // OK, because server.js is also in src/
const pool = require('../db/index'); // FIXED path

describe('Auth Endpoints', () => {
  // Optional: Clear users table before tests run (be careful in production!)
  beforeAll(async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        yearofstudy VARCHAR,
        program VARCHAR
      );
    `);
    await pool.query('DELETE FROM users');
  });

  afterAll(async () => {
    // Close the database connection when tests finish.
    await pool.end();
  });

  describe('POST /api/auth/register', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', password: '123456' }); // Missing yearOfStudy and program
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testusr', // 7 characters as required (or adjust based on your rules)
          password: '123456',
          yearOfStudy: '1',
          program: 'Software'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.username).toBe('testusr');
    });

    it('should not allow duplicate usernames', async () => {
      // First registration with a given username:
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'duplicate',
          password: '123456',
          yearOfStudy: '2',
          program: 'Engineering'
        });
      // Attempt a second registration with the same username:
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'duplicate',
          password: '123456',
          yearOfStudy: '2',
          program: 'Engineering'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Username already taken.');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testusr' }); // Missing password
      expect(res.statusCode).toBe(400);
    });

    it('should return 401 for a non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'nonexistent', password: '123456' });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('User not found.');
    });

    it('should return 401 if password is incorrect', async () => {
      // Assuming 'testusr' was created in the registration tests with password '123456'
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testusr', password: 'wrongpw' });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Invalid password.');
    });

    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testusr', password: '123456' });
      expect(res.statusCode).toBe(200);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.username).toBe('testusr');
    });
  });

  describe('DELETE /api/auth/delete', () => {
    it('should return 400 if user id is missing', async () => {
      const res = await request(app)
        .delete('/api/auth/delete')
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should delete a user successfully', async () => {
      // First, register a user to delete:
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'deluser',
          password: '123456',
          yearOfStudy: '3',
          program: 'Math'
        });
      const userId = registerRes.body.user.id;
      const res = await request(app)
        .delete('/api/auth/delete')
        .send({ id: userId });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('User deleted successfully.');

      // Verify deletion: attempt to login with the deleted user
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ username: 'deluser', password: '123456' });
      expect(loginRes.statusCode).toBe(401);
      expect(loginRes.body.error).toBe('User not found.');
    });
  });
});
