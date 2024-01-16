const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    folders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder"
    }],
    files:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    }],
        
})

module.exports = mongoose.model('User', userSchema)