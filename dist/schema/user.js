"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql) `
  scalar ObjectId

  enum Role {
    ADMIN
    TEACHER
    STUDENT
  }
  type User {
    id: ObjectId!
    username: String
    role: Role
    email: String
    firstName: String
    lastName: String
    progress: Progress
  }

  input UserInputDetail {
    username: String!
    password: String!
    email: String
    firstName: String
    lastName: String
  }

  type CreateUserMutationResponse{
    code: Int!
    success: Boolean!
    message: String!
    authToken: String!
    user:User
  }

  type Mutation {
    createUser(userInput: UserInputDetail): CreateUserMutationResponse!
    login(userInput: UserInputDetail): CreateUserMutationResponse!
  }

  type Query {
    getUser(_id: ObjectId!): User!
  }
`;
