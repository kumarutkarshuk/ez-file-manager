const express = require('express')
const app = express()
const cors = require('cors')
const {connect} = require('./config/database')
const userRoutes = require('./routes/user')
require('dotenv').config()


const PORT = process.env.PORT
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

//database connection
connect()

//file upload middleware

//cloudinary connection

//mount routes
app.use('/api/v1/auth', userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})

