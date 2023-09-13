import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./schema";
import resolvers from "./resolvers";
const corsOptions = {
  origin: "*",
  credentials: true,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
});

mongoose
  .connect(
    `mongodb+srv://mi1802imran:4xapaYTmddw34Hqx@ed-tech.2dmiasn.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB connected successfully");
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`${res.url}`);
  });
