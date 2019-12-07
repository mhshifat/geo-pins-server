import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import { findOrCreateUser } from "./controllers/user";
import models from "./models";
import resolvers from "./resolvers";
import typeDefs from "./types";
import {
  logDbConnectionMsg,
  logErrMsg,
  logServerInitMsg
} from "./utils/logger";

const { root, db } = config;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null,
      currentUser = null;

    try {
      authToken = req.get("authorization");
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.log(`Unable to authenticate user with this token ${authToken}`);
    }

    return { currentUser, models };
  }
});

server.applyMiddleware({ app });
mongoose
  .connect(db.uri, db.config)
  .then(() => {
    logDbConnectionMsg();
    return app.listen(root.port);
  })
  .then(logServerInitMsg(root.port, server.graphqlPath))
  .catch(logErrMsg);
