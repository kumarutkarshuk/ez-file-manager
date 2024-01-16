const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    parentFolder:{
        type: mongoose.Schema.Types.ObjectId,
        trim:true,
        ref: "Folder"
    },
    url:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('File', fileSchema)