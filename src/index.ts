import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import * as TypeORM from 'typeorm';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import resolvers from './resolver/Resolver';
import config from './utils/config';
import initTestData from './utils/testData';

const initServer = async () => {
  const app = express();
  app.use(cors());

  await TypeORM.createConnection({
    type: 'postgres',
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    host: process.env.PGHOST,
    entities: [
      'src/entity/**/*.ts',
    ],
    synchronize: true,
    logging: false,
    dropSchema: true,
  });

  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  server.applyMiddleware({ app });

  app.listen({ port: config.port }, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

initServer().then(() => {
  initTestData();
});
