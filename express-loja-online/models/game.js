const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: { type: String, required: true},
  type: { type: String, required: false},
  price: { type: Number, required: true},
  description: {type: String, required: true},
  img: {type: String, required: true},
  avgClassification: {type: Number, required: true}, 
  allClassifications: [{type: Number}]
});

GameSchema.virtual("url").get(function () {
    return `/game/${this._id}`;
  });

// Export model
module.exports = mongoose.model("Game", GameSchema);
