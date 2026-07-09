# **StudentHUB Backend**

## **Credits**  
*(Add your name if you contribute to the backend development)*  
- **Abdulkadir Ahmed**  

## **Deployment**  
The backend is **hosted on Render**. The live API endpoint can be found in the frontend as the `BACKEND_URL` variable.  

## **Backend Version**  

### **Backend v1.0**  
- Contains a simple **Express.js server** (`server.js`).  
- API test route:  
  ```http
  GET /api/test
  ```
  ### **Backend v2.0**
- **Persistent Storage Integration:**  
  - Integrated PostgreSQL using the `pg` package for persistent data storage.
  - Created a database connection pool in `src/db/index.js` that reads connection parameters from environment variables.
  - Developed SQL query functions in `src/db/queries.js` to handle CRUD operations for courses (currently supporting "add" and "get all").

- **New API Endpoints for Courses:**  
  - Implemented a new router in `src/routes/courses.js` with the following endpoints:
    - `GET /api/courses`: Retrieves all courses from the PostgreSQL database.
    - `POST /api/courses`: Inserts a new course into the database using JSON payload data.
  
- **Server Updates:**  
  - Updated `src/server.js` to import and mount the courses router alongside the existing test route.
  - Configured the server to listen on `process.env.PORT` (with a fallback to port 5000) to support deployment on Render.

- **Local Testing & Verification:**  
  - Verified the GET endpoint returns an empty array when no courses exist.
  - Tested the POST endpoint using cURL (and/or Postman) to add a course and confirmed the returned JSON object contains the new course with an auto-generated `id`.
  - Confirmed persistence by directly querying the PostgreSQL database.

- **Deployment:**  
  - Automatic deployment is set up on Render. Pushing changes to the connected GitHub repository automatically triggers a new deployment.
  
- **Future Improvements:**  
  - Expand CRUD functionality by adding update and delete endpoints.
  - Enhance error handling and implement comprehensive unit and integration tests.
  - Extend API endpoints to support additional user stories as the project evolves.

