const jwt = require('jsonwebtoken');
const User = require(`./../models/user`);

const verifyToken =  (req,res,next)=>{
    const accesstoken = req.headers.authorization;
    if(accesstoken){
        jwt.verify(accesstoken,process.env.JWT_KEY,(err,user)=>{
            if(err) next();
            // console.log(user);
            req.user = user;
        });
        next();
    }
    else{
        res.status(401).json({"message" : "User Not authenticated"});
        return;
    }
};



module.exports = {verifyToken};