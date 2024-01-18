const express = require('express')
const router = express.Router()
const {auth} = require('../middlewares/auth')
const {signUp, login} = require('../controllers/auth')
const { upload } = require('../middlewares/multer')

const {uploadFile, 
    deleteFile,
    renameFile,
    moveFile,
    getAllFiles
} = require('../controllers/file')

const { createFolder, 
    deleteFolder,
    renameFolder,
    getAllFolders

} = require('../controllers/folder')

router.post('/login', login)
router.post('/signup', signUp)


//where is this "uploadedFile" used? -> key has to be same as it in form-data
//uploading single file as of now
router.post('/upload-file', upload.single('uploadedFile'), auth, uploadFile)
router.delete('/delete-file', auth, deleteFile)
router.put('/rename-file', auth, renameFile)
router.post('/move-file', auth, moveFile)
router.post('/get-all-files', auth, getAllFiles)


router.post('/create-folder', auth, createFolder)
router.delete('/delete-folder', auth, deleteFolder)
router.put('/rename-folder', auth, renameFolder)
router.post('/get-all-folders', auth, getAllFolders)

module.exports = router

