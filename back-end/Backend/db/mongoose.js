










const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.mongo;

mongoose.connect(url).then(()=>{console.log("database connected")});


