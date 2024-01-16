const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    //will this work as it's the same model
    parentFolder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
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

module.exports = mongoose.model('Folder', folderSchema)