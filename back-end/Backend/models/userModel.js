const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
require('dotenv').config();

const userschema = new mongoose.Schema({
    username : {
        type : String , 
        required : true ,
        trim : true ,
        validate(val) {
            let USER_REGEX = new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{3,23}$");
            if(!USER_REGEX.test(val)) 
                throw new Error("INVALID_USERNAME => 4 to 24 characters. Must begin with a letter. Letters, numbers , underscores , hyphens allowed")
        }
    },
    password : {
        type : String ,
        required : true ,
        trim : true , 
        minlength : 8 ,
        validate(val) {
            let  PASS_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if (!PASS_REGEX.test(val)) 
                throw new Error("INVALID_PASSWORD => 8 to 24 characters Must include uppercase and lowercase letters, a number and a special character Allowed special characters: ! @ # $ % " +"///////////" + val)
        }
    },
    email : {
        type : String , 
        required : true ,
        trim : true ,
        unique : true ,
        lowercase : true ,
        validate(val) {
            if(!validator.isEmail(val)) 
               throw new Error("INVALID_EMAIL");             
        }
    },
    token : [
        {
            type : String , 
            required : true ,
        }
    ]
})

userschema.pre("save", async function() {
    const user = this;

    if (user.isModified('password'))
         user.password = await bycrypt.hash(user.password , 8);
    //console.log(user.isModified("password"));
})

///////////////////////////////////////////////////////////////////////

//statics allow you to use functions on model
userschema.statics.findByCredntials = async (em,pass)=> {
    const user = await User.findOne({email : em});
    //console.log(user);
    if(!user) 
       throw new Error("incorrect email or password");

    //console.log(user);
    
    const isMatch = await bycrypt.compare(pass,user.password);

    if(!isMatch)
       throw new Error("incorrect password");

    //console.log("LOGIN success");
    return user;
}
//////////////////////////////////////////////////////////
// method to generate token for user

userschema.methods.generatetoken = async function () {
    const user = this;
    //const expiration = Date.now() + (24 * 60 * 60 * 1000);
    const token = jwt.sign({_id : user._id.toString()} , process.env.JWT_SECRET_KEY );
    user.token = user.token.concat(token);
    await user.save();
    return token;
}

///////////////////////////////////////////////////////////

userschema.methods.toJson = async function() {
    const user = this;

    const myData = user.toObject();

    //delete myData.password;
    //delete myData.token;
    
    return myData;
}

//////////////////////////////////////////////////////////

const User = mongoose.model('user' ,userschema);

///////////////////////////////////////////////////////////

module.exports = User