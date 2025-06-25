// models/freelancer.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const freelancerSchema = new Schema(
  {
    name: { type: String, },
    gender: { type: String },
    email: { type: String, lowercase: true, unique: true },
    mobile: { type: String },
    profileImage: { type: String }, // Path to the uploaded profile image
    skills: [{ type: String }], // Array of skill strings
    hourlyRate: { type: Number, min: 0 },
    bio: { type: String },
    experience: { type: Number, min: 0 }, // Years of experience
    location: { type: String },
    availability: { type: String }, // e.g., "Full-time", "Part-time"
    portfolioLinks: [{ type: String }],
    termsAndConditionsAgreed: { type: Boolean },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

export default Freelancer;
