const express = require('express')
const app = express()
const cors = require('cors')
const {connect} = require('./config/database')
require('dotenv').config()


const PORT = process.env.PORT
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

//file upload middleware

//database connection
connect()

//cloudinary connection

//mount routes


app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})

