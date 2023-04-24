const express = require("express");
const router = express.Router();

const users_controller = require("../controller/userController");
const init_controller = require("../controller/initController");
const games_controller = require("../controller/gameController");

router.get("/init", init_controller.init);
router.get("/users", users_controller.users_list);
router.get("/games", games_controller.games_list);

module.exports = router;