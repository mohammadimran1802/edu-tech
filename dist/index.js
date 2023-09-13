"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const corsOptions = {
    origin: "*",
    credentials: true,
};
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    context: ({ req }) => ({ req }),
    cors: {
        credentials: true,
        origin: (origin, callback) => {
            const whitelist = [
                "*",
                "https://edutechfront-ghgoydeql-mohammadimran1802.vercel.app/",
            ];
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    },
});
mongoose_1.default
    .connect(`mongodb+srv://mi1802imran:4xapaYTmddw34Hqx@ed-tech.2dmiasn.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
    console.log("MongoDB connected successfully");
    return server.listen({ port: 4000 });
})
    .then((res) => {
    console.log(`${res.url}`);
});
