const User = require("../models/user");
const Game = require("../models/game");
const Present = require("../models/present");

// devolve json com todos os users
exports.users_get = async (req, res) => {
    const users = await User.find({});
    res.set('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(users));
};

// preenche o campo user_id da sessao com o id do user atual
exports.user_login_get = async (req, res) => {
    req.session.user_id = req.params.id;
    res.status(200).json({ message: 'login bem sucedido' });
};

exports.following_users_get = async (req, res) => {
  try {
    const userId = req.session.user_id;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in session' });
    }

    const user = await User.findById(userId).populate('following');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching following users' });
  }
};

exports.user_library_get = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user_id).populate('library').exec();
    if (user == null) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json(user.library);
  } catch (err) {
    return next(err);
  }
};


// verifica se o login foi efetuado
exports.user_isLogged_get = async (req, res) => {
  res.status(200).json({ value: req.session.user_id != undefined });
};

// faz logout do user atual
exports.user_logout_get = async (req, res) => {
  delete req.session.user_id;
  res.status(200).json({ message: 'logout bem sucedido' });
}

// regista um novo user
exports.user_register_post = async(req, res) => {
    const user = new User({ name: req.body.name, email: req.body.email, password:req.body.password, wishList: req.body.wishList, library: req.body.library, recievedGames: req.body.recievedGames, sentGames: req.body.sentGames });
    user.save();
    res.set('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(user));
    
}

// Display detail page for a specific User.
// /user/id - GET - devolve uma resposta JSON com os detalhes do user especificado pelo id
exports.user_detail = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user_id).exec();
    if (user == null) {
      // No results.
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so return JSON object
    res.json(user);
  } catch (err) {
    return next(err);
  }
};

exports.user_sendGame_put = async(req, res, next) => {
  if(req.session.user_id == req.body[0]) {
    res.status(200).json({ message: 'Não pode enviar um presente a si proprio!' });
  } else {
    var sender = await User.findById({_id: req.session.user_id});
    var reciever =  await User.findById({_id: req.body[0]});
    var sentGame = req.body[1];
    var hasGame = false;
    for(var i = 0; i < reciever.recievedGames.length && !hasGame; i++) {
      var p = await Present.findById(reciever.recievedGames[i]);
      console.log(reciever.recievedGames[i]);
      console.log(p);
      if(p.game._id == sentGame._id) {
        hasGame = true;
      }
    }
    for(var i = 0; i < reciever.library.length && !hasGame; i++) {
      if(reciever.library[i]._id == sentGame._id) {
        hasGame = true;
      }
    }
    if(!hasGame) {
      var present = new Present({game: sentGame._id, sender: sender._id, reciever: reciever, status:0});
      present.save();
      reciever.recievedGames.push(present);
      reciever.save();
      sender.sentGames.push(present);
      sender.save();
      res.status(200).json({ message: 'Presente enviado!' });
    } else {
      res.status(200).json({ message: 'O utilizador selecionado já tem este jogo!' });
    }
  }
};

exports.user_sentGames_get = async(req, res, next) => {
  var result = []
  var presents = await Present.find({});
  for(var i = 0; i < presents.length; i++) {
    if(presents[i].sender._id.toString() === req.session.user_id) {
      var g = await Game.findById(presents[i].game);
      result.push(g)
    }
  }
  res.json(result);
};

exports.user_recievedGames_get = async(req, res, next) => {
  var result = []
  var presents = await Present.find({});
  for(var i = 0; i < presents.length; i++) {
    if(presents[i].reciever._id.toString() === req.session.user_id) {
      var g = await Game.findById(presents[i].game);
      result.push(g)
    }
  }
  res.json(result);
};
