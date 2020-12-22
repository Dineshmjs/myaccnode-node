const mongoose = require('mongoose')
const title = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    debit:{
        type:Number,
        required:true
    },
    credit:{
        type:Number,
        required:true
    },
    available:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("titles",title)