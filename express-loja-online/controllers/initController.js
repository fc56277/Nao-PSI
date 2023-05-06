const User = require("../models/user");
const Game = require("../models/game");
const present = require("../models/present");

exports.init = async (req, res) => {
    await User.deleteMany({});
    await Game.deleteMany({});
    await present.deleteMany({});

    await User.create([
      { name: 'user1', 
      password: "1"},
    ]);
    
    const user1 = await User.findOne({ name: "user1" });

    const user2 = new User({ 
      name: 'user2',
      password: "2",
      followers: [user1._id], // Adiciona o _id do user1 à lista de seguidores do user2
      //following: [user1.id],
    });
    
    await user2.save();
    
    user1.following.push(user2._id); // Adiciona o _id do user2 à lista de a seguir do user1
    await user1.save();

    Game.create([
      { name: 'Among Us', type: "Multiplayer, Social Deduction", price: 4.99, description: "Among Us is a multiplayer online game developed and published by InnerSloth. The game takes place in a space-themed setting where players take on one of two roles: Crewmates or Impostors.", img: 'http://drive.google.com/uc?export=view&id=1mAh0iw7lOg4rpFEr7iW0vMmaAcoDv_43'},
      { name: 'The Witcher 3', type: "RPG", price: 39.99, description: "Based on the popular book series, The Witcher 3: Wild Hunt follows the journey of Geralt of Rivia, a monster hunter in a dark fantasy world.", img: 'http://drive.google.com/uc?export=view&id=1SP3gIuSOkWt7cJkyNojIFz2ICFjoguXm'},
      { name: 'Elden Ring', type: "RPG", price: 4.99, description: "FromSoftware and George R.R. Martin bring you Elden Ring, an epic action RPG set in a vast and mysterious world. Players will create their own character, explore the landscape, and battle fearsome creatures using a variety of weapons and magic. With a focus on player choice and consequence, Elden Ring promises to deliver a deep and engaging gameplay experience.", img: 'http://drive.google.com/uc?export=view&id=1sdG9WHVsgzAFMyuDNLZx7olbC1pkkGjJ'},
      { name: 'F1 2022', type:"Racing", price: 59.99, description: "Take the wheel of a Formula One car and race to victory in F1 2021. This racing game features realistic physics, challenging AI opponents, and a variety of tracks to race on.", img: 'http://drive.google.com/uc?export=view&id=1DOET63YbwTBgvObQb10iXDXKrLMgvTN9'},
      { name: 'FIFA 23', type: "Sports", price: 69.99, description: "Experience the thrill of soccer in FIFA 23. This sports game features updated rosters, realistic graphics, and new gameplay mechanics to enhance the experience for both new and returning players", img: 'http://drive.google.com/uc?export=view&id=16XfCDQ6F5Pes2QLazgZqOzs5pqDiRDnz'},
      { name: 'Minecraft', type: "Sandbox, survival game", price: 19.99 , description: "Minecraft is a game that allows players to explore, create, and survive in a blocky 3D world. The game has two primary modes: Survival, where players must gather resources and build structures to survive against monsters and other players, and Creative, where players have unlimited resources to build whatever they can imagine.", img: 'http://drive.google.com/uc?export=view&id=1Ob3BffiPAtMXSPk3qmHy7EJSzTuanBnG'}
    ]);


    const games = await Game.find().limit(2); // encontra os dois primeiros jogos na lista de jogos
    user1.library = games.map(game => game._id); // mapeia os jogos e armazena os seus _id na biblioteca do user1
    await user1.save();
      
    res.json("Database Initializated");
};