const Game = require("../models/game");

exports.games_list = async (req, res) => {
    const games = await Game.find({});
    res.json(games);
};

exports.games_names = async (req, res) => {

    const searchTerm = req.query.name;
    console.log("AAAAAAAAAAAAA"+searchTerm);

  if (!searchTerm) {
    return res.status(400).json({ error: "Missing search term" });
  }

  const regex = new RegExp(`^${searchTerm}`, "i");

  try {
    const games = await Game.find({ name: { $regex: regex } });
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }

};

