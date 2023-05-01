const User = require("../models/user");
const Game = require("../models/game");

exports.init = async (req, res) => {
    await User.deleteMany({});
    await Game.deleteMany({});

    await User.create([
      { name: 'user1', 
      email: "user1@gmail.com", 
      password: "1", 
      imagemPerfil: "https://i.scdn.co/image/ab67616d00001e027a58bc39b4e2466cd9273c55"},
    ]);
    
    const user1 = await User.findOne({ email: "user1@gmail.com" });

    const user2 = new User({ 
      name: 'user2',
      email: "user2@gmail.com",
      password: "2",
      followers: [user1._id], // Adiciona o _id do user1 à lista de seguidores do user2
      //following: [user1.id],
    });
    
    await user2.save();
    
    user1.following.push(user2._id); // Adiciona o _id do user2 à lista de a seguir do user1
    await user1.save();

    Game.create([
      { name: 'Among Us', type: "Multiplayer, Social Deduction", price: 4.99, description: "Among Us is a multiplayer online game developed and published by InnerSloth. The game takes place in a space-themed setting where players take on one of two roles: Crewmates or Impostors.", img: 'https://sm.ign.com/ign_pt/cover/a/among-us/among-us_2qcn.jpg'},
      { name: 'The Witcher 3', type: "RPG", price: 39.99, description: "Based on the popular book series, The Witcher 3: Wild Hunt follows the journey of Geralt of Rivia, a monster hunter in a dark fantasy world.", img: 'https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png'},
      { name: 'Elden Ring', type: "RPG", price: 4.99, description: "FromSoftware and George R.R. Martin bring you Elden Ring, an epic action RPG set in a vast and mysterious world. Players will create their own character, explore the landscape, and battle fearsome creatures using a variety of weapons and magic. With a focus on player choice and consequence, Elden Ring promises to deliver a deep and engaging gameplay experience.", img: 'https://upload.wikimedia.org/wikipedia/pt/0/0d/Elden_Ring_capa.jpg'},
      { name: 'F1 2022', type:"Racing", price: 59.99, description: "Take the wheel of a Formula One car and race to victory in F1 2021. This racing game features realistic physics, challenging AI opponents, and a variety of tracks to race on.", img: 'https://meups.com.br/wp-content/uploads/2022/05/F1-22-capa-do-jogo.jpg'},
      { name: 'FIFA 23', type: "Sports", price: 69.90, description: "Experience the thrill of soccer in FIFA 23. This sports game features updated rosters, realistic graphics, and new gameplay mechanics to enhance the experience for both new and returning players", img: 'https://assetsio.reedpopcdn.com/fifa-main_1lH9jGy.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp'},
      { name: 'Minecraft', type: "Sandbox, survival game", price: 19.99 , description: "Minecraft is a game that allows players to explore, create, and survive in a blocky 3D world. The game has two primary modes: Survival, where players must gather resources and build structures to survive against monsters and other players, and Creative, where players have unlimited resources to build whatever they can imagine.", img: 'https://upload.wikimedia.org/wikipedia/pt/9/9c/Minecraft_capa.png'}
    ]);

    const games = await Game.find().limit(2); // encontra os dois primeiros jogos na lista de jogos
    user1.library = games.map(game => game._id); // mapeia os jogos e armazena os seus _id na biblioteca do user1
    await user1.save();
      
    res.json("Database Initializated");
};