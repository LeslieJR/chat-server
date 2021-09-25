const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique:true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.statics.encrypt = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

UserSchema.statics.compare = async function (plainPassword, hash) {
  const isValid = await bcrypt.compare(plainPassword, hash);
  return isValid;
};

const UserModel = model("User", UserSchema);
module.exports = UserModel;
