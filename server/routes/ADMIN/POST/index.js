const express = require('express');
const { removeProducts, addProducts, updateProducts } = require('../../../controller/admin/shoes');
const { storage } = require('../../../utils/storage/index');
const multer = require('multer');
const upload = multer({ storage });
const uploadImages=multer({storage,
    limits: { 
        fileSize: 5 * 1024 * 1024, // 5 MB limit per file
        files: 4 // Maximum number of files allowed
}})
const router = express.Router()
router.post('/RemoveUser',removeProducts);
router.post('/AddProduct',addProducts);
router.post('/RemoveProduct',removeProducts);
router.post('/EditProduct',updateProducts);
module.exports = router;