import mongoose from 'mongoose';

const submissionSchema = mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    submitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    optionSelected: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    option1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    option2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    option3: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef Submission
 */
const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
