import express, { json } from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";

import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.info("🔥 MongoDB is connected");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authorization = req.headers.authorization;
        const token = authorization?.split(" ").at(1);

        if (token) {
          try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            return decodedToken;
          } catch (error) {
            console.error(error.message);
          }
        }

        return {};
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at: ${PORT}`);
  });
}

main().catch((err) => console.log(err));
