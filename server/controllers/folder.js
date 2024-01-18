const Folder = require('../models/folder')
const User = require('../models/user')
const File = require('../models/file')


exports.createFolder = async (req, res)=>{
    
    try{
        const {name, parentFolder} = req.body

        const folderDetails = await Folder.create({name, parentFolder})

        const userDetails = await User.findById(req.user.id)
        userDetails.folders.push(folderDetails._id)
        userDetails.save()

        let parentFolderDetails = await Folder.findById(folderDetails.parentFolder)
        while(parentFolderDetails !== null){
            parentFolderDetails.folders.push(folderDetails._id)
            parentFolderDetails.save()
            parentFolderDetails = await Folder.findById(parentFolderDetails.parentFolder)
        }

        const {folders} = await User.findById(req.user.id).populate('folders').exec()
        
        return res.status(200).json({
            success:true,
            message:"Folder creation successful",
            folderDetails,
            folderArray: folders
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error creating folder",
        })
    }

}

//most challenging
exports.deleteFolder = async (req, res)=>{
    
    try{
        const {folderId} = req.body
        const folderDetails = await Folder.findById(folderId)
        const userDetails = await User.findById(req.user.id)

        //delete descendent files
        folderDetails.files.forEach(async (element) => {
            await File.findByIdAndDelete(element)

            const index = userDetails.files.indexOf(element)
            
            if(index !== -1){
                userDetails.files.splice(index, 1)
            }
        })
        //descendent folders
        folderDetails.folders.forEach(async (element) => {
            await Folder.findByIdAndDelete(element)
            const index = userDetails.folders.indexOf(element)
            // console.log("index: ", index)
            if(index !== -1){
                userDetails.folders.splice(index, 1)
            }
        })
        
        //delete folder
        await Folder.findByIdAndDelete(folderId)

        //delete from users
        const index = userDetails.folders.findIndex((element) => element == folderId)
        if(index !== -1){
            userDetails.folders.splice(index, 1)
            
        }

        let parentFolderDetails = await Folder.findById(folderDetails.parentFolder)
        while(parentFolderDetails !== null){
            //remove the folder
            const index = parentFolderDetails.folders.indexOf(folderId)
            if(index !== -1){
                parentFolderDetails.folders.splice(index,1)
            }

            //remove descendent files and folders
            folderDetails.files.forEach((element) => {
                const index = parentFolderDetails.files.indexOf(element)
                if(index !== -1){
                    parentFolderDetails.files.splice(index,1)
                }
            })
            folderDetails.folders.forEach((element) => {
                const index = parentFolderDetails.folders.indexOf(element)
                if(index !== -1){
                    parentFolderDetails.folders.splice(index,1)
                    
                }
            })
            parentFolderDetails.save()
            parentFolderDetails = await Folder.findById(parentFolderDetails.parentFolder)
        }
        userDetails.save()

        const {folders} = await User.findById(req.user.id).populate('folders').exec()
        
        return res.status(200).json({
            success:true,
            message:"Folder deletion successful",
            folderArray:folders
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error deleting folder",
        })
    }

}

exports.renameFolder = async (req, res)=>{
    
    try{
        const {folderId, name} = req.body

        const folderDetails = await Folder.findById(folderId)
        folderDetails.name = name
        folderDetails.save()

        const {folders} = await User.findById(req.user.id).populate('folders').exec()
        
        return res.status(200).json({
            success:true,
            message:"Folder rename successful",
            folderArray: folders
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error renaming folder",
        })
    }

}

//changes
// exports.moveFolder = async (req, res)=>{
    
//     try{
//         const {folderId, parentFolderId} = req.body

//         const folderDetails = await Folder.findById(folderId)

//         folderDetails.parentFolder = parentFolderId
//         folderDetails.save()
        
//         return res.status(200).json({
//             success:true,
//             message:"Folder moved successfully",
//         })

//     }catch(error){
//         console.log("Error: ", error)

//         return res.status(500).json({
//             success:false,
//             message:"Error moving folder",
//         })
//     }

// }

exports.getAllFolders = async (req, res)=>{
    
    try{
        const {id} = req.user

        const userDetails = await User.findById(id).populate('folders').exec()
        
        return res.status(200).json({
            success:true,
            message:"Folders fetched successfully",
            folderArray: userDetails.folders
        })

    }catch(error){
        console.log("Error: ", error)

        return res.status(500).json({
            success:false,
            message:"Error fetching folders",
        })
    }

}