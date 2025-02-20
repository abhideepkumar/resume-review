import mongoose from "mongoose";

const UserResumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    ResumeJson: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export const user = mongoose.model("user", UserResumeSchema);
