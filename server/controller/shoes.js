const Shoe = require('../models/shoes');
const shoes = require('../models/shoes')
const getAllShoes=(req,res)=>{

    try {
        const result = shoes.find().limit().skip();
    } catch (error) {
        
    }
}
const getShoesByCompany=async(req,res)=>{
    try {
        const {company} = req.params
        const {limit,skip} = req.query
        const data = await Shoe.find({company:company}).limit(limit).skip(skip).exec()
        if(data){
            console.log('data yumyum',data.length)
            res.json({data,success:true})
        }
        else{
            console.log("nuh uh")
            res.json({error:"could'nt fetch products",success:false})
        }
    } catch (error) {
        res.json({error,success:false})
    }
}
const getShoesById=async(req,res)=>{
    try {
        const {id} = req.params
        const data = await Shoe.findById(id);
        res.status(200).json({data,success:true})
    } catch (error) {
        res.status(500).json({error,success:false})
    }
}
module.exports = {
    getAllShoes,
    getShoesByCompany,
    getShoesById
}