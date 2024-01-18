const File = require('../models/file')
const User = require('../models/user')
const Folder = require('../models/folder')
const { uploadOnCloudinary } = require("../utils/cloudinary")

exports.uploadFile = async (req, res)=>{
    
    try{
        const {name, parentFolder} = req.body
        // console.log("File object: ", req.file);
        const response = await uploadOnCloudinary(req.file.path)
        let fileDetails
        if(parentFolder !== 'undefined'){
            fileDetails = await File.create({name, parentFolder, url: response.url})
        }
        else{
            fileDetails = await File.create({name, url: response.url})
        }
        
        const userDetails = await User.findById(req.user.id)
        const fileId = fileDetails._id
        // console.log(userDetails);
        userDetails.files.push(fileId)
        userDetails.save()

        //challenging code

        //add in the parent folders
        if(parentFolder !== "undefined"){
            let parentFolderDetails = await Folder.findById(parentFolder)
            while(parentFolderDetails !== null){
                parentFolderDetails.files.push(fileId)
                parentFolderDetails.save()
                parentFolderDetails = await Folder.findById(parentFolderDetails.parentFolder)
            }
        }

        const {files} = await User.findById(req.user.id).populate('files').exec()
        
        return res.status(200).json({
            success:true,
            message:"File upload successful",
            fileDetails,
            fileArray: files
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
        
        const {files} = await User.findById(req.user.id).populate('files').exec()
        return res.status(200).json({
            success:true,
            message:"File deletion successful",
            fileArray:files
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

        const {files} = await User.findById(req.user.id).populate('files').exec()
        
        return res.status(200).json({
            success:true,
            message:"File rename successful",
            fileArray: files
        })

    }catch(error){
        console.log("Error: ", error.message)
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
        
        //root folder will not have files array
        if(oldFolderDetails){
            const index = oldFolderDetails.files.indexOf(fileId)
            oldFolderDetails.files.splice(index, 1)
            oldFolderDetails.save()
        }
        
        if(parentFolderId === 'root'){
            //delete fileDetails.parentFolder did not work
            fileDetails.parentFolder = undefined
            fileDetails.save()
        }
        else{
            fileDetails.parentFolder = parentFolderId
            fileDetails.save()
        }
        
        
        if(parentFolderId !== 'root'){
            //folder in which the file is
            let folderDetails = await Folder.findById(parentFolderId)
            
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
        }

        else{
            //only remove from folders down the tree
            const {folders} = await User.findById(req.user.id).populate('folders').exec()
            folders.forEach(async (element)=>{
                const folderDetails = await Folder.findById(element)
                const index = folderDetails.folders.indexOf(fileId)
                if(index !== -1){
                    folderDetails.folders.splice(index, 1)
                    folderDetails.save()
                }
            })
        }
        
        const {files} = await User.findById(req.user.id).populate('files').exec()

        return res.status(200).json({
            success:true,
            message:"File moved successfully",
            fileArray: files
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
            fileArray: userDetails.files
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error fetching files",
        })
    }

}