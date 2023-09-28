const route = require('express').Router();
const User = require('../models/user');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER
route.post('/register',async (req,res)=>{
    console.log(req);
    console.log(req.body);
    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password: Crypto.AES.encrypt(req.body.password,process.env.PASS_KEY).toString()
    });

    const emailCheck = await User.findOne({email:newUser.email});
    if(emailCheck){
        res.status(200).json({message:"Email already registered"});
        return;
    }
    const mobileCheck = await User.findOne({mobile:newUser.mobile});
    if(mobileCheck){
        res.status(200).json({message:"Mobile number already registered"});
        return;
    }

    try{
        const savedUser = await newUser.save();
        res.status(201).json({message : `${savedUser.name} registered successfully`});

    }catch(err){
        console.log(err);
        res.status(501).json({message :"Server Error "});
    }
});

//LOGIN
route.post('/login',async(req,res)=>{
    // console.log(req.body);
    // console.log(req.cookies);

    try{
        const user = await User.findOne({$or:[{email:req.body.logUser},
                                            {mobile:req.body.logUser}]});
        if(!user){
            res.status(200).json({message :"user not found"});
            return;
        }
        const password = Crypto.AES.decrypt(user.password,process.env.PASS_KEY).toString(Crypto.enc.Utf8);
        const originalPassword = req.body.password;
        if(password !== originalPassword){
            res.status(200).json({message:"Wrong Password!!!"});
            return;
        }

        const accessToken = jwt.sign({
            id:user._id,
            mobile : user.mobile
        },process.env.JWT_KEY,{expiresIn:'1h'});

        res.status(202)
            .json({ message: "Logged in successfully",
                    redirectURL: `http://127.0.0.1:5000/`,
                    token : accessToken });

    }catch(err){
        res.status(502).json("Server Error"+ err);
    }
});

module.exports = route; 