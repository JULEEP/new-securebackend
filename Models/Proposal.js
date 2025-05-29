import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    overview: { type: String },
    scopeOfWork: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    totalAmount: { type: Number },
    termsAndConditions: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

const Proposal = mongoose.model('Proposal', proposalSchema);

export default Proposal;
