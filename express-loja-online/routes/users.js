var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

/* pedidos com prefixo /users */

// lista de todos os users
router.get('/', user_controller.users_get);

// faz login de um user
router.get('/login/:id', user_controller.user_login_get);

// verifica se existe um user logado
router.get('/login', user_controller.user_isLogged_get);

// faz logout do user atual
router.get('/logout', user_controller.user_logout_get);

// regista um novo user
router.post('/register', user_controller.user_register_post);

router.get('/following', user_controller.following_users_get);

router.get('/library', user_controller.user_library_get);

router.put('/sendGame', user_controller.user_sendGame_put);

router.put('/incCart', user_controller.incCart);

module.exports = router;
