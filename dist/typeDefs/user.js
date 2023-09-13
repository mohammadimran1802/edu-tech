"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql) `
  interface MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String!
}

  enum Role {
    ADMIN
    TEACHER
    STUDENT
  }
  type User {
    id: ID!
    username: String!
    role:Role
    email: String!
    firstName: String!
    lastName: String!
    progress: Progress!
  }

  input UserInputDetail {
    username: String!
    password: String!
    email: String
    firstName: String
    lastName: String
  }

  type CreateUserMutationResponse implements MutationResponse{
    code: Int!
    success: Boolean!
    message: String!
    token:String!
    user: User
}

  type Mutation {
    createUser(userInput:UserInputDetail): CreateUserMutationResponse!
    login(userInput: UserInputDetail): CreateUserMutationResponse!
  }

  type Query {
    getUser(id: ID!): User
  }
`;
