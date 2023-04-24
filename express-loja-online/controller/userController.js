const User = require("../models/user");

exports.users_list = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};
