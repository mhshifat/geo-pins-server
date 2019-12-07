import { model, Schema } from "mongoose";

const pinSchema = new Schema(
  {
    title: String,
    content: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comments: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now
        },
        author: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model("Pin", pinSchema);
