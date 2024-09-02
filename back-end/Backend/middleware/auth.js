const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const auth = async(req,res,next)=>{
    try
    {
        // from the authorization replace token with another
        const token = req.header('Authorization').replace('Bearer ' , '');
        //console.log(token);

        // verify that the token exists with the secret key
        const decode = jwt.verify(token , process.env.JWT_SECRET_KEY);
        //console.log(decode);

        // find the user with id and token
        const user = await User.findOne({_id : decode._id , token : token});
        //console.log(user);
        
        if(!user)
            throw new Error();
        req.user = user;
        req.token = token;
        next();
    }
    catch(ex)
    {
        res.status(401).send("please authenicate");   
    }
}

module.exports = auth;
