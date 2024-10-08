const express = require('express');
const { Register, Login, addInCart, addInFavourite,removeFromCart, removeFromFavourite } = require('../../controller/user');
const router = express.Router()
router.post('/Register',Register);
router.post('/Login',Login);
router.post('/AddInCart',addInCart);
router.post('/RemoveFromFavourite',removeFromFavourite);
router.post('/RemoveFromCart',removeFromCart);
router.post('/AddInFavourite',addInFavourite);
router.post('/PaymentGateway')
module.exports = router