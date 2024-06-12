const express = require('express');
const getUser = require('../../middleware');
const { getuser } = require('../../controller/user');
const router = express.Router()
router.get('/getAllShoes');
router.get('/getShoesByCategory/:category');
router.get('/getShoeById/:id');
router.get('/getUser',getUser,getuser);
router.get('/getUserCart');
router.get('/getUserFavourite');
module.exports=  router;