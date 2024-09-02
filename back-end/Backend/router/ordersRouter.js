const express = require('express');
const Order = require('../models/ordersmodel');
const orders_router = express.Router();
const auth = require('../middleware/auth');

orders_router.get('/frg' , async(req,res)=>{
    try
    {
        res.send('hello')
    }
    catch(error) {
        res.send(error.message)
    }
})

orders_router.patch('/add_products',auth,async(req,res)=>{
    try {
        const find_order = await Order.findById(req.user._id);
        //console.log(find_order);
        //console.log(req.body);
        if(!find_order) { 
            const order = new Order({_id :req.user._id,...req.body});
            await order.save().then((data)=>{
                res.status(200).send(data)
            }).catch((error)=>{
                res.status(404).send(error)})
        } else {
            const updates = Object.keys(req.body);
            updates.forEach((ele)=>{
                find_order[ele] = req.body[ele];
            })
            await find_order.save();
        }
    } catch (error) {
        res.status(404).send(ex.message);
    }
})

orders_router.patch('/delete_products',auth,async(req,res)=>{
    try {
        const find_order = await Order.findById(req.user._id);
        const updates = Object.keys(req.body);
        updates.forEach((ele)=> find_order[ele] = req.body[ele]);
        await find_order.save()
    } catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
})


module.exports = orders_router;
