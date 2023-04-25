const User = require("../models/user");

exports.users_get = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};
