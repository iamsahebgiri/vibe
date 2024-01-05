import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import { dateScalar } from './scalars.js';
import User from './models/user.js';

const resolvers = {
  Date: dateScalar,
  Query: {
    getMe: async (_, __, { userId }) => {
      if (!userId) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
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
            code: 'BAD_REQUEST',
            http: {
              status: 401,
            },
          },
        });
      }
      return user;
    },
    getUserActivity: () => 'getUserActivity',
    getMyInbox: () => 'getUserInbox',
    getNextQuestion: async (_, __, { userId }) => {
      if (!userId) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      const randomQuestion = await Question.aggregate([
        {
          $lookup: {
            from: 'Submission',
            let: { questionId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$question', '$$questionId'] },
                      { $eq: ['$from', id] },
                    ],
                  },
                },
              },
            ],
            as: 'answers',
          },
        },
        {
          $match: {
            answers: { $size: 0 }, // Filter out questions with no answers for the specific user
          },
        },
        { $sample: { size: 1 } }, // Get a random question
      ]);

      return randomQuestion[0];
    },
    getRandom4Options: async (_, __, { userId }) => {
      if (!userId) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      const randomUsers = await User.aggregate([
        {
          $sample: { size: 4 },
        },
        {
          $addFields: { id: '$_id' }, // add id field, workaround to rename _id to id
        },
      ]);
      return randomUsers;
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      if (await User.isEmailTaken(email)) {
        throw new GraphQLError('Email already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: 'email',
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
      });

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );

      return {
        token,
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isPasswordMatch(password))) {
        throw new GraphQLError('Incorrect email or password', {
          extensions: {
            code: 'BAD_REQUEST',
            http: {
              status: 401,
            },
          },
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );

      return {
        token,
      };
    },

    updateUser: async (
      _,
      { id, name, avatar, dateOfBirth, bio, gender },
      { userId }
    ) => {
      // User can update it's own account
      if (userId !== id) {
        throw new GraphQLError("You can't perform this action", {
          extensions: {
            code: 'UNAUTHORIZED',
            http: { status: 401 },
          },
        });
      }

      const user = await User.findByIdAndUpdate(
        id,
        {
          name,
          avatar,
          dateOfBirth,
          bio,
          gender,
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
            code: 'UNAUTHORIZED',
            http: { status: 401 },
          },
        });
      }
      const user = await User.findByIdAndDelete(id);
      return user;
    },

    submitQuestion: () => {
        
    },
  },
};

export default resolvers;
