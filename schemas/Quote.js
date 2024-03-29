const mongoose = require('mongoose');


const QuoteSchema= new mongoose.Schema({
    quoteName: {type:String, unique:true,},
    user: String,
    hourRate: String,
    hours:Number ,
    physicalCost: {type: Array, "number":[]},
    softwareCost: {type: Array, "number":[]},
    finalQuote: Number
});


module.exports = mongoose.model('quotes', QuoteSchema);