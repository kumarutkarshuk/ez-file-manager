const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    parentFolder:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref: "Folder"
    },  
})

module.exports = mongoose.model('File', fileSchema)