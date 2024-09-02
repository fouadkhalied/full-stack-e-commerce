







const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const auth = require('../middleware/auth');

router.get('/' , (req,res)=>{
   try
   {
    const user = {name : 'this' , age : 19}
    res.status(200).send(user);
   }
   catch(ex) {
     res.status(404).send(ex.message);
   }
})

router.post('/register_new_user' , async(req,res)=>{
      try 
      {
        const user = new User(req.body);
        await user.save().
        then((data)=>res.status(200).send(data)).catch((error)=>res.status(404).send(error));          
      }
      catch (ex) {
        res.status(404).send(ex.message);
      }
})


router.get('/users/:id',auth,async (req,res)=> {

    const _id = req.params.id;

    console.log(_id);
    await User.findById(_id).then((data)=>{
        if(data)
           res.status(200).send(data)
        else
           return res.status(404).send("unable to find data")
    }).catch((error)=>{
        res.status(404).send(error)
    })
})

router.patch('/users/:id',auth,async (req,res)=>{
    try {
        const updates = Object.keys(req.body);
        //console.log(updates);
        const _id = req.params.id;

        // const user = await User.findByIdAndUpdate (_id , req.body , {
        //     new : true ,
        //     runValidators : true // => بتعمل رن للشروط اللي عندك
        // })
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send("unable to find user");
        }
        updates.forEach((ele)=>{
            user[ele] = req.body[ele];
        })
        if (user.isModified("password"))
            user.password = await bycrypt.hash(user.password , 8);
        res.status(200).send(user)
    }
    catch (ex) {
        res.status(404).send(ex)
    }
})

router.delete('/users/:id',auth , async (req,res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send("unable to find user");
        }
        res.status(200).send(user)
    }
    catch (ex)
    {
        res.status(404).send(ex);
    }
})
/////////////////////////////////////////////////////////////////

// Profile :

router.get('/profile' , auth , async (req,res)=>{
    res.status(200).send(req.user);
})

//////////////////////////////////////////////////////////////////

// login :

router.post('/login_new_user',async (req,res) => {
    try
    {
        const user = await User.findByCredntials(req.body.email,req.body.password); //
        const token = await user.generatetoken();
        const myData = await user.toJson();

        // res.cookie('token' , token , {
        //     path : '/' ,
        //     httpOnly : true , 
        //     expires : '1d' ,
        //     secure : true
        // })

        res.status(200).json({
            success: true,
            message: 'Login successful',
            mytoken : token
          });
    }
    catch(ex)
    {
        res.status(404).json({message : ex.message});
    }
})
//////////////////////////////////////////////////////////////////

// tokens : 
// router.post('/register' , async (req,res)=>{
//     try
//     {
//         const user = new User(req.body);
//         const token = await user.generatetoken();
//         await user.save();
//         res.status(200).send({user,token});
//     }
//     catch(ex)
//     {
//         throw new Error(ex.message);
//     }
// })

/////////////////////////////////////////////////////////////////

// Logout from all devices
router.delete('/logout',auth,async (req,res)=>{
    try
    {
        console.log(req.user);
        req.user.token = [];
        await req.user.save();
        res.cookie("token" , "" , {
            path : '/' ,
            httpOnly : true ,
            expires : new Date(0),
            sameSite : 'none' ,
            secure : true
        })
        return res.status(200).send("logout sucessfully");
    }
    catch(ex)
    {
        res.status(404).send(ex);
    }
})

module.exports = router;