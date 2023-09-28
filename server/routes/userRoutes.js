const route = require('express').Router();
const Order = require('../models/order');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./tokenVerify');


route.post('/add-order',verifyToken,async(req,res)=>{
    try{
        const {orderCount, mobile } = req.body;
        const userId = req.user.id;
        // console.log(req.user);
        const newOrder = new Order({
            userId : userId,
            orderCount : orderCount,
            mobile : mobile
        });
        
        const response = await newOrder.save();
        res.status(200).json({ message: 'Order added successfully' });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


route.get('/get-order',verifyToken,async (req,res)=>{
    const userId = req.user.id;

    try{
        const data = await Order.find({userId : userId});
        console.log(data);
        res.status(200).json(data);
        return;
    }catch(err){
        res.status(500).json(err);
        return;
    }
});


module.exports = route; 