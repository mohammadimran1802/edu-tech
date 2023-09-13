"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
require("dotenv/config");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
exports.default = {
    Mutation: {
        login: (_, { userInput: { username, password } }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ username });
            // Unauthenticated
            const failedResponse = { status: 401 };
            // In case username doesn't exist in database
            if (!user)
                return failedResponse;
            const match = bcrypt_1.default.compare(password, user.password);
            // In case password doesn't match with information in database
            if (!match)
                return failedResponse;
            // Generate token and return user information
            const token = (0, generateToken_1.default)(user);
            return {
                // Success
                status: 200,
                user: {
                    id: user._id,
                    token,
                    username: user.username
                }
            };
        }),
        register: (_, { userInput: { username, password } }) => __awaiter(void 0, void 0, void 0, function* () {
            // Username already in database, conflict
            try {
                if (yield User_1.default.findOne({ username }))
                    return { status: 409 };
                // Only save hashed password for security.
                password = yield bcrypt_1.default.hash(password, 10);
                const user = new User_1.default({
                    username,
                    password,
                    posts: [],
                    likes: []
                });
                // Save the user in database
                yield user.save();
                // Generate token and return user information
                const token = (0, generateToken_1.default)(user);
                return {
                    // Created
                    status: 201,
                    user: {
                        id: user._id,
                        token,
                        username: user.username
                    }
                };
            }
            catch (e) {
                console.log(e);
            }
        })
    }
};
//# sourceMappingURL=userResolver.js.map