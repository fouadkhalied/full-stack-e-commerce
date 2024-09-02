






const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const userRouter = require('./router/userRouter');
const orders_router = require("./router/ordersRouter");


app.use(express.json());
app.use(userRouter);
app.use(orders_router);

require('../Backend/db/mongoose');

app.listen(port , ()=>{console.log("App run success on port =>",port)});


