import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true 
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    // match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  education: {
    degree: {
      type: String,
      required: true,
      trim: true
    },
    branch: {
      type: String,
      required: true,
      trim: true
    },
    institution: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
    }
  },
  experience: {
    job_title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
      default: null
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  summary: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

applicantSchema.index({ name: 'text' });

export const applicant = mongoose.model("applicant", applicantSchema);
