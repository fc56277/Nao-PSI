const Game = require("../models/game");

exports.games_list = async (req, res) => {
  const games = await Game.find({});
  res.json(games);
};

exports.games_names = async (req, res) => {
  
  const searchTerm = req.params.name;
  
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

exports.getGameById = async (req, res) => {
  try {
    const gameId = req.params.id; 
    console.log(gameId);
    const game = await Game.findById({_id: gameId});
    

    if (!game) { 
      return res.status(404).json({ error: 'Game not found' });
    }
    
    return res.json(game); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

