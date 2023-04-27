const User = require("../models/user");

// devolve json com todos os users
exports.users_get = async (req, res) => {
    const users = await User.find({});
    res.set('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(users));
};

// regista um novo user
exports.user_register_post = async(req, res) => {
    const user = new User({ name: req.body.name, email: req.body.email, password:req.body.password, wishList: req.body.wishList });
    user.save();
    res.set('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(user));
}

//APAGAR (?)
exports.user_id = async (req, res) => {
    const user = await User.findOne({ id: req.params.id });
    res.json(user);
};

// Display detail page for a specific User.
// /user/id - GET - devolve uma resposta JSON com os detalhes do user especificado pelo id
exports.user_detail = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).exec();
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