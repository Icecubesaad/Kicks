const express = require('express');
const { Register, Login } = require('../../controller/user');
const router = express.Router()
router.post('/Register',Register);
router.post('/Login',Login);
router.post('/AddInCart');
router.post('/AddInFavourite');
router.post('/PaymentGateway')
module.exports = router