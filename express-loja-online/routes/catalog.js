const express = require("express");
const router = express.Router();

const users_controller = require("../controllers/userController");
const init_controller = require("../controllers/initController");
const games_controller = require("../controllers/gameController");

router.get("/init", init_controller.init);

router.get("/users", users_controller.users_get);

router.get("/api/user", users_controller.user_detail);

router.get("/games", games_controller.games_list);

router.get("/games/:name", games_controller.games_names);

router.get("/detail/:id", games_controller.getGameById);
 
module.exports = router;