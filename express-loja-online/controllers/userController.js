const User = require("../models/user");

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
    const user = new User({ name: req.body.name, email: req.body.email, password:req.body.password, wishList: req.body.wishList });
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