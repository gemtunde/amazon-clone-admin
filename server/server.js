const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//models
const User = require('./models/user')

dotenv.config();

const app = express();
mongoose.connect(process.env.DB,
{useNewUrlParser: true, useUnifiedTopology: true},
 err =>{
  if(err){
    console.log(err)
  }else{
    console.log("connected to the database");
  }
})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//require apis
const productRoutes = require('./routes/product');
app.use("/api", productRoutes);

app.listen(3000, err => {
    if(err){
        console.log(err);
    } else{
        console.log("listening on port", 3000);
    }
})










