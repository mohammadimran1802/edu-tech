"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
require("dotenv/config");
const graphql_1 = require("graphql");
const jwt_1 = require("../utils/jwt");
exports.default = {
    Mutation: {
        login: async (_, { userInput: { username, password } }) => {
            const user = await User_1.UserModel.findOne({ username });
            // Unauthenticated
            // In case username doesn't exist in database
            if (!user)
                throw new graphql_1.GraphQLError(`This user doesn't exists in the system.`, {
                    extensions: { code: 409, message: "user doesn't exist" },
                });
            const match = bcrypt_1.default.compare(password, user.password);
            // In case password doesn't match with information in database
            if (!match)
                throw new graphql_1.GraphQLError(`invalid password.`, {
                    extensions: { code: 409, message: "invalid password" },
                });
            // Generate token and return user information
            return {
                // Success
                code: 200,
                success: true,
                message: `Login successful`,
                authToken: (0, jwt_1.createToken)({
                    id: user._id.toString(),
                    username: user.username,
                    role: user.role,
                }),
                user,
            };
        },
        createUser: async (_, { userInput: { username, password, firstName, lastName, email } }) => {
            // Username already in database,
            let existingUser = await User_1.UserModel.findOne({ username }).exec();
            if (existingUser)
                throw new graphql_1.GraphQLError(`This user already exists in the system.`, {
                    extensions: { code: "USER_ALREADY_EXISTS" },
                });
            const user = new User_1.UserModel({
                username,
                password: await bcrypt_1.default.hash(password, 10),
                email,
                firstName,
                lastName,
                role: User_1.Role.Student,
            });
            // Save the user in database
            await user.save();
            return {
                code: 200,
                success: true,
                message: `Login successful`,
                authToken: (0, jwt_1.createToken)({
                    id: user._id.toString(),
                    username: user.username,
                    role: user.role,
                }),
                user,
            };
        },
    },
    Query: {
        getUser: async (_, { _id }) => {
            let user = await User_1.UserModel.findOne({ _id: _id }).exec();
            if (user == null)
                throw new graphql_1.GraphQLError(`This user doesn't exists in the system.`, {
                    extensions: { code: "INVALID_USER" },
                });
            return user;
        },
    },
};
