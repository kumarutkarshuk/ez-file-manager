const express = require('express')
const router = express.Router()
const {auth} = require('../middlewares/auth')
const {signUp, login} = require('../controllers/Auth')
const { upload } = require('../middlewares/multer')
const { uploader } = require('../controllers/uploader')

router.post('/login', login)
router.post('/signup', signUp)
//where is this "uploadedFile" used? -> key has to be same as it in form-data
//uploading single file as of now
router.post('/upload', upload.single('uploadedFile'), auth, uploader)

module.exports = router

