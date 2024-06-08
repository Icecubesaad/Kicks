const express = require('express')
const router = express.Router()
router.get('/getAllShoes');
router.get('/getShoesByCategory/:category');
router.get('/getShoeById/:id');
router.get('/getUser');
router.get('/getUserCart');
router.get('/getUserFavourite');
module.exports=  router;