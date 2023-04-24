const User = require("../models/user");
const Game = require("../models/game");

exports.init = async (req, res) => {
    await User.deleteMany({});
    await Game.deleteMany({});

    User.create([
      { name: 'user1', email: "user1@gmail.com", password: "1" },
      { name: 'user2', email: "user2@gmail.com", password: "2"  },
    ]);

    Game.create([
      { name: 'game1'},
      { name: 'game2'},
    ]);
      
    res.json("Database Initializated");
};