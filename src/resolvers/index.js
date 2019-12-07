import { fileLoader, mergeResolvers } from "merge-graphql-schemas";

export default mergeResolvers(
  fileLoader(__dirname, {
    extensions: [".js"]
  })
);
