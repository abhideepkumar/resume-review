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
  education: [{
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
      type: String,
    }
  }],
  experience: [{
    job_title: {
      type: String,
      required: false,
      trim: true
    },
    company: {
      type: String,
      required: false,
      trim: true
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
      default: null
    }
  }],
  projects: [{
    project_name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    skills_used: [{
      skill_name: {
        type: String,
        required: true,
        trim: true
      },
      level: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      }
    }]
  }],
  skills: [{
    skill_name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  }],
  summary: {
    type: String,
    required: true,
    trim: true
  },
  predicted_designation: [{
    type: String,
    required: true,
    trim: true
  }],
  predicted_experience: [{
    type: String,
    required: true,
    trim: true
  }],
  predicted_salary: [{
    type: String,
    required: true,
    trim: true
  }]
}, {
  timestamps: true
});

applicantSchema.index({ name: 'text' });

export const applicant = mongoose.model("applicant", applicantSchema);
