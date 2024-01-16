const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Folder', folderSchema)