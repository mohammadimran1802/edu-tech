import bcrypt from "bcrypt";
import { UserModel, Role } from "../models/User";
import "dotenv/config";
import generateToken from "../utils/generateToken";
import { GraphQLError } from "graphql";
import { createToken } from "../utils/jwt";
export default {
  Mutation: {
    login: async (_, { userInput: { username, password } }) => {
      const user = await UserModel.findOne({ username });

      // Unauthenticated

      // In case username doesn't exist in database
      if (!user)
        throw new GraphQLError(`This user doesn't exists in the system.`, {
          extensions: { code: 409, message: "user doesn't exist" },
        });

      const match = bcrypt.compare(password, user.password);
      // In case password doesn't match with information in database
      if (!match)
        throw new GraphQLError(`invalid password.`, {
          extensions: { code: 409, message: "invalid password" },
        });

      // Generate token and return user information

      return {
        // Success
        code: 200,
        success: true,
        message: `Login successful`,
        authToken: createToken({
          id: user._id.toString(),
          username: user.username,
          role: user.role,
        }),
        user,
      };
    },

    createUser: async (
      _,
      { userInput: { username, password, firstName, lastName, email } }
    ) => {
      // Username already in database,
      let existingUser = await UserModel.findOne({ username }).exec();
      if (existingUser)
        throw new GraphQLError(`This user already exists in the system.`, {
          extensions: { code: "USER_ALREADY_EXISTS" },
        });

      const user = new UserModel({
        username,
        password: await bcrypt.hash(password, 10),
        email,
        firstName,
        lastName,
        role: Role.Student,
      });
      // Save the user in database
      await user.save();

      return {
        code: 200,
        success: true,
        message: `Login successful`,
        authToken: createToken({
          id: user._id.toString(),
          username: user.username,
          role: user.role,
        }),
        user,
      };
    },
  },
  Query: {
    getUser: async (_, { _id}) => {
      let user = await UserModel.findOne({ _id: _id }).exec();
      if (user == null)
        throw new GraphQLError(`This user doesn't exists in the system.`, {
          extensions: { code: "INVALID_USER" },
        });
      return user;
    },
  },

};
