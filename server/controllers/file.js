const File = require('../models/file')
const User = require('../models/user')
const Folder = require('../models/folder')
const { uploadOnCloudinary } = require("../utils/cloudinary")
const folder = require('../models/folder')

exports.uploadFile = async (req, res)=>{
    
    try{
        const {name, parentFolder} = req.body
        // console.log("File object: ", req.file);
        const response = await uploadOnCloudinary(req.file.path)

        const fileDetails = await File.create({name, parentFolder, url: response.url})
        const userDetails = await User.findById(req.user.id)
        const fileId = fileDetails._id
        // console.log(userDetails);
        userDetails.files.push(fileId)
        userDetails.save()

        //challenging code

        let parentFolderDetails = await Folder.findById(parentFolder)
        while(parentFolderDetails !== null){
            parentFolderDetails.files.push(fileId)
            parentFolderDetails.save()
            parentFolderDetails = await Folder.findById(parentFolderDetails.parentFolder)
        }
        
        return res.status(200).json({
            success:true,
            message:"File upload successful",
            fileDetails
        })

    }catch(error){
        console.log("Error: ", error.message)

        return res.status(500).json({
            success:false,
            message:"Error uploading file",

        })
    }

}


exports.deleteFile = async (req, res)=>{
    
    try{
        const {fileId} = req.body

        const fileDetails = await File.findById(fileId)
        await File.findByIdAndDelete(fileId)

        const userDetails = await User.findById(req.user.id)
        const index = userDetails.files.findIndex((element) => element == fileId)
        if(index !== -1){
            userDetails.files.splice(index, 1)
            userDetails.save()
        }

        let parentFolderDetails = await Folder.findById(fileDetails.parentFolder)
        while(parentFolderDetails !== null){
            
            const index = parentFolderDetails.files.findIndex((element)=> element == fileId)
            if(index !== -1){
                parentFolderDetails.files.splice(index, 1)
                parentFolderDetails.save()
            }
            parentFolderDetails = await Folder.findById(parentFolderDetails.parentFolder)
        }
        
        return res.status(200).json({
            success:true,
            message:"File deletion successful",
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error deleting file",
        })
    }

}

exports.renameFile = async (req, res)=>{
    
    try{
        const {fileId, name} = req.body

        const fileDetails = await File.findById(fileId)

        fileDetails.name = name
        fileDetails.save()
        
        return res.status(200).json({
            success:true,
            message:"File rename successful",
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error renaming file",
        })
    }

}

exports.moveFile = async (req, res)=>{
    
    try{
        const {fileId, parentFolderId} = req.body

        const fileDetails = await File.findById(fileId)

        const oldFolderDetails = await Folder.findById(fileDetails.parentFolder)
        const index = oldFolderDetails.files.indexOf(fileId)
        oldFolderDetails.files.splice(index, 1)
        oldFolderDetails.save()
        fileDetails.parentFolder = parentFolderId
        fileDetails.save()
        
        //folder in which the file is
        const folderDetails = await Folder.findById(parentFolderId)

        
        //it should not be present in the folders down the tree
        folderDetails.folders.forEach(async (element)=>{
            const folderDetails = await Folder.findById(element)
            const index = folderDetails.folders.indexOf(fileId)
            if(index !== -1){
                folderDetails.folders.splice(index, 1)
                folderDetails.save()
            }
        })

        //it should be present in the folders up the tree
        let parentFolderDetails = await Folder.findById(parentFolderId)
        while(parentFolderDetails !== null){
            const index = parentFolderDetails.files.indexOf(fileId)
            if(index === -1){
                parentFolderDetails.files.push(fileId)
                parentFolderDetails.save()
            }
            
            parentFolderDetails = await Folder.findById(parentFolderDetails.parentFolder)
        }

        return res.status(200).json({
            success:true,
            message:"File moved successfully",
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error moving file",
        })
    }

}

exports.getAllFiles = async (req, res)=>{
    
    try{
        const {id} = req.user

        const userDetails = await User.findById(id).populate('files').exec()
        
        return res.status(200).json({
            success:true,
            message:"Files fetched successfully",
            filesArray: userDetails.files
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error fetching files",
        })
    }

}