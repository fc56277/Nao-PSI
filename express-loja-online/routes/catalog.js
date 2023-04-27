const express = require("express");
const router = express.Router();

const users_controller = require("../controllers/userController");
const init_controller = require("../controllers/initController");
const games_controller = require("../controllers/gameController");

router.get("/init", init_controller.init);

router.get("/users", users_controller.users_get);

router.get("/user/:id", users_controller.user_detail);

router.get("/games", games_controller.games_list);

module.exports = router;