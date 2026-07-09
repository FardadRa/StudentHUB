const request = require('supertest');
const app = require('../app'); // Your Express app
const pool = require('../db/index');

describe('Group Chat API', () => {
    let server;
    beforeAll(() => {
        server = app.listen(4000);
    });

    afterAll(async () => {
        await pool.end();
        server.close();
    });

    test('GET /api/chat/messages returns an array of messages', async () => {
        const res = await request(server).get('/api/chat/messages');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /api/chat/messages sends a message', async () => {
        const res = await request(server)
            .post('/api/chat/messages')
            .send({
                username: 'User1234',
                content: 'This is a test message',
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.content).toBe('This is a test message');
    });

    test('GET /api/chat/userinfo returns user info', async () => {
        const res = await request(server).get('/api/chat/userinfo?username=User1234');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
    });
});