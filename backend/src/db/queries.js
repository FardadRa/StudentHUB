// src/db/queries.js
const pool = require("./index");

// CREATE (Add a Course)
async function addCourse(course) {
  const text = `
    INSERT INTO courses (name, day, time, professor, room)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [
    course.name,
    course.day,
    course.time,
    course.professor || null,
    course.room || null,
  ];

  const result = await pool.query(text, values);
  return result.rows[0]; // Return the newly inserted course
}

// READ (Get All Courses)
async function getCourses() {
  const text = `SELECT * FROM courses;`;
  const result = await pool.query(text);
  return result.rows; // Array of courses
}

// Optionally, you can add more queries like UPDATE, DELETE, etc.

// CREATE (Save a Chat Message)
async function saveMessage({ senderId, senderName, senderYear, senderProgram, content }) {
  const text = `
    INSERT INTO messages (senderId, senderName, senderYear, senderProgram, content)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [senderId, senderName, senderYear, senderProgram, content];

  const result = await pool.query(text, values);
  return result.rows[0]; // Return the newly inserted message
}

// READ (Get All Chat Messages)
async function getMessages() {
  const text = `
    SELECT m.id, m.senderid, u.name AS sendername, u.yearofstudy AS senderyear, 
           u.program AS senderprogram, m.content, m.timestamp 
    FROM messages m
    JOIN users u ON m.senderid = u.id
    ORDER BY m.timestamp ASC;
  `;
  const result = await pool.query(text);
  return result.rows;
}

module.exports = {
  addCourse,
  getCourses,
  saveMessage,
  getMessages,
};
