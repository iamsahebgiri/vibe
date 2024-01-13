const typeDefs = `#graphql
  scalar Date

  type Question {
    id: ID
    text: String
    emoji: String
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
    age: Int
    bio: String
    gender: String
    phaseOfLife: String
    
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    ping: String
    getMe: User
    getUserProfile(id: ID!): User
    getUserActivity: [Submission]
    getMyInbox: [Submission]
    getMyTopDrips: [Submission]

    getQuestions: [Question]
    getOptions: [User]
  }

  type AuthData {
    token: String
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthData
    login(email: String!, password: String!): AuthData
    loginWithGoogle(idToken: String!): AuthData

    updateUser(name: String, avatar: String, age: Int, bio: String, gender: String, phaseOfLife: String): User
    deleteUser(id: ID!): User

    submitQuestion(questionId: ID!, optionSelected: ID!, option1: ID!, option2: ID!, option3: ID!): Submission
  }
`;

export default typeDefs;
