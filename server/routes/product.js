const router = require('express').Router();
const  Product = require('../models/product');

//post product route
router.post('/products', async (req, res)=> {   
    try{
         let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.body.photo;    
    product.stockQuantity = req.body.stockQuantity;

    await product.save();
    res.json({
        status: true,
        message: "product save"
    });
    }catch(err){
        res.status(500).json({
            status:false,
            message: err.message
        })
    }
});
module.exports = router ;