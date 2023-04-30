const User = require("../models/user");
const Game = require("../models/game");

exports.init = async (req, res) => {
    await User.deleteMany({});
    await Game.deleteMany({});

    await User.create([
      { name: 'user1', 
      password: "1", 
      imagemPerfil: "https://i.scdn.co/image/ab67616d00001e027a58bc39b4e2466cd9273c55"},
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
      { name: 'Among Us', type: "Multiplayer, Social Deduction", price: 4.99, description: "Among Us is a multiplayer online game developed and published by InnerSloth. The game takes place in a space-themed setting where players take on one of two roles: Crewmates or Impostors. Crewmates must complete tasks around the map while trying to identify and eliminate the Impostors before they sabotage the mission. Impostors must blend in with the Crewmates and eliminate them without being caught. The game is known for its social deduction aspect and has gained popularity through online streaming and social media.", img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png'},
      { name: 'The Witcher 3', type: "RPG", price: 39.99, description: "Based on the popular book series, The Witcher 3: Wild Hunt follows the journey of Geralt of Rivia, a monster hunter in a dark fantasy world. The game features a vast open world, deep characters, and engaging combat.", img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png'},
      { name: 'Elden Ring', type: "RPG Deduction", price: 4.99, description: "FromSoftware and George R.R. Martin bring you Elden Ring, an epic action RPG set in a vast and mysterious world. Players will create their own character, explore the landscape, and battle fearsome creatures using a variety of weapons and magic. With a focus on player choice and consequence, Elden Ring promises to deliver a deep and engaging gameplay experience.", img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png'},
      { name: 'F1 2023', type:"Racing", price: 59.99, description: "Take the wheel of a Formula One car and race to victory in F1 2021. This racing game features realistic physics, challenging AI opponents, and a variety of tracks to race on.", img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png'},
      { name: 'FIFA 23', type: "Sports", price: 69.90, description: "Experience the thrill of soccer in FIFA 23. This sports game features updated rosters, realistic graphics, and new gameplay mechanics to enhance the experience for both new and returning players", img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png'},
      { name: 'CS:GO', type: "First-person Shooter", price: 69.90, description: "description", img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png'}
    ]);
      
    res.json("Database Initializated");
};