const router = require('express').Router();
const  Category = require('../models/category');

//post request
router.post("/categories", async (req, res) => {
 try {
     let category = new Category();
  category.type = req.body.type
  await category.save();
  res.status(200).json({
    success : true,
    message : "category created successfully"
  });
 } catch (error) {
    res.status(500).json({
        success : false,
        message: error.message
    });
 }
});

//get request
router.get("/categories", async (req, res) => {
    try {
        let categories = await Category.find();
        res.status(200).json({
            success: true,
            categories : categories
        })
    } catch (error) {
          res.status(500).json({
        success : false,
        message: error.message
    });
    }
})
module.exports = router ;
