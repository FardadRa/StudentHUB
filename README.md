# 🎓 StudentHUB

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

An AI-powered academic management platform designed to help university students organize courses, collaborate with classmates, and receive personalized academic advising.

---

## Overview

StudentHUB is a full-stack mobile application built with **React Native**, **Express.js**, **PostgreSQL**, and the **OpenAI API**.

The platform combines traditional student management features with an AI-powered academic advisor capable of analyzing student degree audits, retrieving official course information, and generating personalized academic recommendations.

---

## My Contributions

I independently designed and implemented the AI Academic Advisor feature from scratch.

My responsibilities included:

- Designing and building the chatbot frontend using React Native
- Developing the complete Express.js backend for the AI assistant
- Integrating the OpenAI API
- Building REST APIs for AI communication
- Implementing PDF upload and processing
- Extracting text from degree audit PDFs
- Building a course information retrieval service
- Creating a York University course scraper using Axios and Cheerio
- Connecting the chatbot with PostgreSQL
- Designing prompts that combine student information with official course data to generate personalized advising responses

---

## Features

### 🤖 AI Academic Advisor

- Upload degree audit PDFs
- AI-generated degree summaries
- Personalized course recommendations
- Academic planning assistance
- Natural language Q&A

---

### 📚 Course Management

- View available courses
- Schedule planning
- Academic advising
- Course lookup

---

### 👥 Student Collaboration

- Student groups
- Shared schedules
- Communication features

---

## Tech Stack

### Frontend

- React Native
- TypeScript

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### AI

- OpenAI API

### Web Scraping

- Axios
- Cheerio

### Other

- REST APIs
- PDF Parsing

---

## Architecture

```
React Native App
        │
        ▼
 Express.js REST API
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
OpenAI API   PostgreSQL
 │
 ▼
Course Scraper
(Axios + Cheerio)
```

---

## Project Structure

```
frontend/
    React Native Application

backend/
    Express.js API
    PostgreSQL
    OpenAI Integration
    Course Scraper
```

---

## Future Improvements

- Authentication enhancements
- Deployment to cloud infrastructure
- Real-time notifications
- Calendar synchronization
- AI degree planning improvements

---

## Team

This project was developed as part of a university project.

My primary contribution focused on designing and developing the complete AI Academic Advisor system, including both frontend and backend implementation.
