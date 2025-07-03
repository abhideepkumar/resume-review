# Resume Analysis Backend

A Node.js backend service that provides RESTful APIs for resume analysis. It leverages MongoDB (cloud), Google Gemini LLM for text processing, and JWT-based authentication. The service is deployed on Railway.

## Features

- **JWT Authentication:**  
  User need to create account first. Then they need to login with their credentials to start analysing resumes.
- **Resume Data Enrichment:**  
  Accepts a PDF URL,(supports a Google Drive pdf link) extracts text using a PDF parser, and sends the raw data to Google Gemini LLM. The LLM response is then structured into JSON (including fields like name, email, education, experience, skills, and a candidate summary and many useful fields) and stored in a MongoDB collection.

- **Resume Search:**  
  Provides case-insensitive search for stored resume records by candidate name. Returns a list of matching entries if found.

## Setup

### Prerequisites

- Node.js
- MongoDB Cloud account (free tier)
- Google Gemini API key (free tier)
- Deployment on Railway (or similar service)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/abhideepkumar/resume-review.git
cd resume-review
npm install
```

### Environment Variables (.env)

Configure the following in your `.env` file:

```env
PORT=3000
MONGO_URI=<mongodb_connection_string>
JWT_SECRET=<jwt_secret>
JWT_EXPIRY=1h
GEMINI_API_KEY=<gemini_api_key>
```

## API Endpoints

1. **Authentication API**

   - **Endpoint:** `/api/v1/users/signup` (POST)
   - **Request:** JSON body with `username` and `password`
   - **Response:** On success, returns a success message and then you can use for login.

   - **Endpoint:** `/api/v1/users/login` (POST)
   - **Request:** JSON body with `username` and `password`
   - **Response:** On success, returns a JWT for future requests.

2. **Resume Data Enrichment API**

   - **Endpoint:** `/api/v1/resume/uploadResume` (POST)
   - **Request:** JSON body with `{"url": <PDF_url>}` and JWT in the Authorization header
   - **Response:** On successful extraction and enrichment, returns status 200 and stores the structured resume data in MongoDB.

3. **Resume Search API**
   - **Endpoint:** `/api/v1/resume/searchResume` (POST)
   - **Request:** JSON body with `{"name": <search_query>}` and JWT in the Authorization header
   - **Response:** Returns matching resume records (case-insensitive search) or a 404 if no match is found.

## Testing & Deployment

- **Testing:**  
   Use Postman to test your endpoints.
  [Postman Link](https://www.postman.com/descent-module-saganist-43462673/workspace/my-workspace/request/42499024-a80db53f-3db7-423d-b09e-0e0daded2c30?action=share&creator=42499024&ctx=documentation&active-environment=42499024-bba7bb7b-e04d-4991-b093-6d1b13154738)
  A dummy PDF URL for testing:`https://www.dhli.in/uploaded_files/resumes/resume_3404.pdf`

- **Deployment:**  
  The service is deployed on Railway.  
  Live service: [https://resume-review-production.up.railway.app/](https://resume-review-production.up.railway.app/)
