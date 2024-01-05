const typeDefs = `#graphql
  scalar Date

  type Question {
    id: ID
    text: String
    emoji: String
    createdAt: String
    updatedAt: String
  }

  type Submission {
    id: ID
    question: Question
    from: User
    to: User
    option1: User
    option2: User
    option3: User

    createdAt: Date
    updatedAt: Date
  }

  type User {
    id: String
    name: String
    email: String
    avatar: String
    dateOfBirth: Date
    bio: String
    gender: String
    
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getMe: User
    getUserProfile(id: ID!): User
    getUserActivity: [Submission]
    getMyInbox: [Submission]
    getMyTopDrips: [Submission]
    getNextQuestion: Question
    getRandom4Options: [User]
  }

  type AuthData {
    token: String
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthData
    login(email: String!, password: String!): AuthData

    updateUser(id: ID!, name: String, avatar: String, dateOfBirth: Date, bio: String, gender: String): User
    deleteUser(id: ID!): User

    submitQuestion(questionId: ID!, to: ID!, option1: ID!, option2: ID!, option3: ID!): Submission
  }
`;

export default typeDefs;
