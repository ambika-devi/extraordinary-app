const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const connectDB = require('./db');
const seedDatabase = require('./seed');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { getUserFromToken } = require('./utils/auth');

const PORT = 4000;

const startServer = async () => {
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      const user = getUserFromToken(token);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`));
};

startServer();
