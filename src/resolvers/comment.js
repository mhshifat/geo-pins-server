import { AuthenticationError } from "apollo-server-express";

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) throw new AuthenticationError("You must be logged in!");
  return next(root, args, ctx, info);
};

export default {
  Query: {},
  Mutation: {
    createComment: authenticated(
      async (_, { pinId, text }, { models, currentUser }) => {
        try {
          const newComment = { text, author: currentUser._id };
          return await models.Pin.findByIdAndUpdate(
            pinId,
            { $push: { comments: newComment } },
            { new: true }
          )
            .populate("author")
            .populate("comments.author");
        } catch (err) {
          console.error(err);
        }
      }
    )
  }
};
