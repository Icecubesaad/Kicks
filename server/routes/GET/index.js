const express = require('express');
const getUser = require('../../middleware');
const { getuser } = require('../../controller/user');
const { getShoesByCompany } = require('../../controller/shoes');
const router = express.Router()
router.get('/getAllShoes');
router.get('/getShoesByCompany/:company',getShoesByCompany);
router.get('/getShoeById/:id');
router.get('/getUser',getUser,getuser);
router.get('/getUserCart');
router.get('/getUserFavourite');
module.exports=  router;