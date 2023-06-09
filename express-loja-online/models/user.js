const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true},
  password: { type: String, required: true},
  imagemPerfil: { type: String, required: false},
  wishList: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  following: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  library: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  recievedGames: [{ type: Schema.Types.ObjectId, ref: 'Present' }],
  sentGames: [{ type: Schema.Types.ObjectId, ref: 'Present' }],
  shoppingCartSize: { type: Number, required: true},
});

UserSchema.virtual("url").get(function () {
    return `/user/${this._id}`;
  });

// Export model
module.exports = mongoose.model("User", UserSchema);