const express = require('express')
const router = express.Router()
router.post('/Register');
router.post('/Login');
router.post('/AddInCart');
router.post('/AddInFavourite');
router.post('/PaymentGateway')
module.exports = router