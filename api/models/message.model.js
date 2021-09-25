const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user_one: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user_two: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user_owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const MessageModel = model("Message", MessageSchema);
module.exports = MessageModel;
