const mongoose = require('mongoose')
const file = mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    filetype:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("files",file)