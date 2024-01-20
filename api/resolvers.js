import { GraphQLError } from "graphql";

import { dateScalar } from "./scalars.js";
import User from "./models/user.js";
import Question from "./models/question.js";
import Submission from "./models/submission.js";
import { generateToken } from "./utils/token.js";
import { verify } from "./utils/google.js";
import mongoose from "mongoose";

const resolvers = {
  Date: dateScalar,
  Query: {
    ping: () => "PONG",
    getMe: async (_, __, { userId }) => {
      if (!userId) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const user = await User.findById(userId);
      return user;
    },
    getUserProfile: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new GraphQLError("User doesn't exists ", {
          extensions: {
            code: "BAD_REQUEST",
            http: {
              status: 401,
            },
          },
        });
      }
      return user;
    },
    getUserActivity: async (_, __, { userId }) => {
      if (!userId) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const submissions = await Submission.find()
        .sort({ createdAt: "desc" })
        .populate("question")
        .populate("submitter")
        .populate("optionSelected")
        .populate("option1")
        .populate("option2")
        .populate("option3");
      return submissions;
    },
    getMyInbox: async (_, __, { userId }) => {
      if (!userId) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const submissions = await Submission.find({
        optionSelected: userId,
      })
        .sort({ createdAt: "desc" })
        .populate("question")
        .populate("submitter")
        .populate("optionSelected")
        .populate("option1")
        .populate("option2")
        .populate("option3");
      return submissions;
    },
    getQuestions: async (_, __, { userId }) => {
      if (!userId) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const randomQuestions = await Question.aggregate([
        {
          $lookup: {
            from: "Submission",
            let: { questionId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$question", "$$questionId"] },
                      { $eq: ["$from", userId] },
                    ],
                  },
                },
              },
            ],
            as: "answers",
          },
        },
        {
          $match: {
            answers: { $size: 0 }, // Filter out questions with no answers for the specific user
          },
        },
        { $sample: { size: 2 } }, // Get 12 random questions
        {
          $set: { id: "$_id" }, // add id field, workaround to rename _id to id
        },
      ]);

      return randomQuestions;
    },
    getOptions: async (_, __, { userId }) => {
      if (!userId) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const randomUsers = await User.aggregate([
        { $match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } } },
        {
          $sample: { size: 48 }, // selects 48 users
        },
        {
          $addFields: { id: "$_id" }, // add id field, workaround to rename _id to id
        },
      ]);
      return randomUsers;
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      if (await User.isEmailTaken(email)) {
        throw new GraphQLError("Email already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            argumentName: "email",
            http: {
              status: 409,
            },
          },
        });
      }
      const user = await User.create({
        name,
        email,
        password,
        avatar: `https://api.dicebear.com/7.x/miniavs/png?seed=${email}`,
      });

      const token = generateToken(user);

      return {
        token,
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isPasswordMatch(password))) {
        throw new GraphQLError("Incorrect email or password", {
          extensions: {
            code: "BAD_REQUEST",
            http: {
              status: 401,
            },
          },
        });
      }

      const token = generateToken(user);

      return {
        token,
      };
    },
    loginWithGoogle: async (_, { idToken }) => {
      const { email, name, picture } = await verify(idToken);
      const user = await User.findOneAndUpdate(
        {
          email,
        },
        {
          name,
          email,
          avatar: picture,
          mode: "google",
        },
        {
          upsert: true, // create if doesn't exists
          new: true,
        }
      );

      const token = generateToken(user);

      return {
        token,
      };
    },
    updateUser: async (
      _,
      { name, avatar, age, bio, gender, phaseOfLife },
      { userId }
    ) => {
      // User can update it's own account
      if (!userId) {
        throw new GraphQLError("You can't perform this action", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          name,
          avatar,
          age,
          bio,
          gender,
          phaseOfLife,
        },
        { new: true } // returns updated document
      );
      return user;
    },
    deleteUser: async (_, { id }, { userId }) => {
      // User can delete it's own account
      if (userId !== id) {
        throw new GraphQLError("You can't perform this action", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }
      const user = await User.findByIdAndDelete(id);
      return user;
    },

    submitQuestion: async (
      _,
      { questionId, optionSelected, option1, option2, option3 },
      { userId }
    ) => {
      if (!userId) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const submissoin = await Submission.create({
        question: questionId,
        submitter: userId,
        optionSelected,
        option1,
        option2,
        option3,
      });
      return submissoin;
    },
  },
};

export default resolvers;
