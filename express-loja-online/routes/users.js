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

router.get('/sentGames', user_controller.user_sentGames_get);

router.get('/recievedGames', user_controller.user_recievedGames_get);

router.get('/wishlist', user_controller.user_wishlist_get);

router.put('/confirmPresent', user_controller.user_confirmPresent_put);

router.put('/declinePresent', user_controller.user_declinePresent_put);

router.get('/getSentPresent/:id', user_controller.user_getSentPresent_get);

router.get("/:name", user_controller.user_names);

router.get("/profile/:id", user_controller.getUserById);

router.delete('/deletePresent/:id', user_controller.user_deletePresent_delete);

router.put('/:id', user_controller.update_user);

router.get('/check-username-exists', user_controller.check_username_exists);

module.exports = router;
