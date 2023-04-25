const Game = require("../models/game");

exports.games_list = async (req, res) => {
    const games = await Game.find({});
    res.json(games);
};
