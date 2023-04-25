var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

/* pedidos com prefixo /users */

// lista de todos os users
router.get('/', user_controller.users_get);

module.exports = router;
