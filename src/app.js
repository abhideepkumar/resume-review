import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Express
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";

// routes decclaration
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the Resume Review API. To know more about the API, please visit the documentation. <a href='https://github.com/abhideepkumar/resume-review'>Documentation</a></h1>"
  );
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/resume", resumeRouter);

// Custom error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);

  res.json({
    success: false,
    message: err.message || "Something went wrong",
    errors: err.errors || [],
  });
});

export { app };
