const mongoose = require('mongoose')
const reason = mongoose.Schema({
    reason:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    action:{
        type:String,
        required:true
    },    
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("reason",reason)