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

//retrieve data from server
app.get('/', (req, res) => {
    res.json('hello amazon clone');
});

//send data from frontend to backend
app.post('/', (req, res)=> {
   let user = new User();
   user.name = req.body.name ;
   user.email = req.body.email ;
   user.password = req.body.password ;
   
    //console.log('user details is', user)
    user.save(err => {
        if(err){
            res.json(err);
        }else{
            res.json(user);
        }
    })
})

app.listen(3000, err => {
    if(err){
        console.log(err);
    } else{
        console.log("listening on port", 3000);
    }
})










