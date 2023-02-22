const router = require('express').Router();
const  Product = require('../models/product');

const upload = require("../middlewares/upload-photo");

//post product route
router.post('/products',upload.single("photo"), async (req, res)=> {   
    try{
         let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;    
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

//get all products
router.get("/products", async (req, res)=> {
    try {
        let products = await Product.find();

        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
});

//single product
router.get("/products/:id", async (req, res)=> {
    try {
        let product = await Product.findOne({_id : req.params.id});

        res.json({
            success :true,
            product : product
        });
    } catch (error) {
         res.status(500).json({
            status:false,
            message: error.message
        });
    }
});

//update product
router.put("/products/:id", async (req, res)=> {
    try {
        let product = await Product.findOneAndUpdate({_id : req.params.id},
        {
            $set : {
                title : req.body.title,
                 description : req.body.description,  
                stockQuantity : req.body.stockQuantity,
                category : req.body.categoryID,
                owner : req.body.ownerID
            }

        },
        {upsert : true}
        );

        res.json({
            success :true,
            updatedProduct : product
        });
    } catch (error) {
         res.status(500).json({
            status:false,
            message: error.message
        });
    }
});

module.exports = router ;