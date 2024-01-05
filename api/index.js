import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.info('🔥 MongoDB is connected');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
    context: async ({ req }) => {
      const authorization = req.headers.authorization;
      const token = authorization.split(' ').at(1);

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
  });

  console.log(`🚀 Server ready at: ${url}`);
}

main().catch((err) => console.log(err));
