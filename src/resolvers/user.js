import { AuthenticationError } from "apollo-server-express";

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) throw new AuthenticationError("You must be logged in!");
  return next(root, args, ctx, info);
};

export default {
  Query: {
    me: authenticated((_, __, { currentUser }) => currentUser)
  }
};
