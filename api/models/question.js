import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    emoji: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef Question
 */
const Question = mongoose.model('Question', questionSchema);

export default Question;
