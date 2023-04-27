const User = require("../models/user");
const Game = require("../models/game");

exports.init = async (req, res) => {
    await User.deleteMany({});
    await Game.deleteMany({});

    await User.create([
      { name: 'user1', email: "user1@gmail.com", password: "1",}
    ]);
    
    const user1 = await User.findOne({ email: "user1@gmail.com" });

    const user2 = new User({ 
      name: 'user2',
      email: "user2@gmail.com",
      password: "2",
      followers: [user1._id] // Adiciona o _id do user1 à lista de seguidores do user2
    });
    
    await user2.save();
    
    user1.following.push(user2._id); // Adiciona o _id do user2 à lista de a seguir do user1
    await user1.save();

    Game.create([
      { name: 'game1'},
      { name: 'game2'},
      { name: 'game3'},
      { name: 'game4'},
      { name: 'game5'},
      { name: 'game6'},
    ]);
      
    res.json("Database Initializated");
};