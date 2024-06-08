const shoes = require('../models/shoes')
const getAllShoes=(req,res)=>{

    try {
        const result = shoes.find().limit().skip();
    } catch (error) {
        
    }
}
const getShoesByCategory=()=>{

}
const getShoesById=()=>{

}
module.exports = {
    getAllShoes,
    getShoesByCategory,
    getShoesById
}