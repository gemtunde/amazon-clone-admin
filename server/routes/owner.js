const router = require('express').Router();
const Owner = require("../models/owner");

const upload = require('../middlewares/upload-photo')

//post request

router.post("/owners", upload.single("photo"), async (req, res) => {
    try {
        let owner = new Owner() ;
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;

        await owner.save();
        res.json({
            success : true,
            message: "owner successfully create"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

//get request
router.get("/owners", async (req, res) => {
    try {
        let owner = await Owner.find();

        res.json({
            message: true,
            owner: owner
        });
    } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router ;