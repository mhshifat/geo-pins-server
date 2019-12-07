import { AuthenticationError } from "apollo-server-express";

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) throw new AuthenticationError("You must be logged in!");
  return next(root, args, ctx, info);
};

export default {
  Query: {
    getPins: async (_, __, { models }) => {
      try {
        return await models.Pin.find({})
          .populate("author")
          .populate("comments.author");
      } catch (err) {
        console.error(err);
      }
    }
  },
  Mutation: {
    createPin: authenticated(async (_, { input }, { models, currentUser }) => {
      try {
        const createdPin = await models.Pin.create({
          ...input,
          author: currentUser._id
        });
        return await models.Pin.populate(createdPin, "author");
      } catch (err) {
        console.error(err);
      }
    }),
    deletePin: authenticated(async (_, { pinId }, { models }) => {
      try {
        return await models.Pin.findByIdAndRemove(pinId);
      } catch (err) {
        console.error(err);
      }
    })
  }
};
