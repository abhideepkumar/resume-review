# Resume Analysis Backend

A Node.js service that provides APIs for resume analysis using MongoDB, Google Gemini LLM, and JWT authentication. Deployed on Railway.

## Core Features
- JWT-based user authentication
- Resume text processing via Google Gemini LLM
- Resume search functionality in MongoDB

## Setup

**Prerequisites:**
- Node.js
- MongoDB Cloud account
- Google Gemini API key

**Installation:**
```bash
git clone https://github.com/abhideepkumar/resume-review.git
cd resume-review
npm install
```

**Environment Variables (.env):**
```env
PORT=3000
MONGO_URI=<mongodb_connection_string>
JWT_SECRET=<jwt_secret>
JWT_EXPIRY=1h
GEMINI_API_KEY=<gemini_api_key>
```

## API Endpoints

1. **Authentication** - `/api/v1/users/login` (POST)
2. **Resume Upload** - `/api/v1/resume/uploadResume` (POST)
3. **Resume Search** - `/api/v1/resume/searchResume` (POST)

All endpoints require JWT authentication via HTTP-only cookie.

Live service: https://resume-review-production.up.railway.app/

# Features and practices added from my side
1. Added util classes for async Response and Error handling. 
2. Add middleware
3. Added env example file
4. Added email in user model to make resume searches using email.
5. Followed structured and industry standards