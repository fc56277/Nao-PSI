const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PresentSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  sender: { type: Schema.Types.ObjectId, ref: 'User'},
  reciever: { type: Schema.Types.ObjectId, ref: 'User'},
  status: { type: Number}
});

PresentSchema.virtual("url").get(function () {
    return `/present/${this._id}`;
  });

// Export model
module.exports = mongoose.model("Present", PresentSchema);