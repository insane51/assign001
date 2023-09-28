const mongoose = require('mongoose');
const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const {verifyToken} = require(`./routes/tokenVerify`);
const User = require('./models/user');
const cors = require('cors');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

// Allow requests from any origin
app.use(cors(corsOptions));

env.config();
const  hostname = 'localhost';
const  port = 5000;

const dBurl = process.env.DB_URL;
mongoose.connect(dBurl,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("DB connection");
}).catch((err)=>{
    console.log(err);
});
console.log(`Server running at http://${hostname}:${port}/`);

app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(port,(req,res)=>{
    console.log("run");
});

const authRoute = require('./routes/auth');
app.use('/api',authRoute);

const userRoute = require('./routes/userRoutes');
app.use('/api',userRoute);


