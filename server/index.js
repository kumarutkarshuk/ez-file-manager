const express = require('express')
const app = express()
const cors = require('cors')
const {connect} = require('./config/database')
const routes = require('./routes/route')
require('dotenv').config()


const PORT = process.env.PORT
app.use(express.json())
app.use(cors({
    origin:"https://ez-file-manager.vercel.app/",
    credentials:true
}))

//database connection
connect()

//file upload middleware -> doing in the frontend

//cloudinary connection -> not using

//mount routes
app.use('/api/v1', routes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})

