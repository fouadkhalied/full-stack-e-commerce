const mongoose = require('mongoose');
const orderSchehma = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId
    } ,
    id_of_products : {
        type : Array ,
        required : true
    },
    num_of_orders : {
        type : Number ,
        required : true
    }
});

const Order = mongoose.model('orders' , orderSchehma);
module.exports = Order