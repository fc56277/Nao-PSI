var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

/* pedidos com prefixo /users */

// lista de todos os users
router.get('/', user_controller.users_get);

// regista um novo user
router.post('/register', user_controller.user_register_post);

module.exports = router;
