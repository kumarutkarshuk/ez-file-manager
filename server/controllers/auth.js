const User = require('../models/user')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

exports.signUp = async (req, res)=>{
    try{
        
        const {firstName, lastName, email, password, confirmPassword} = req.body

        if(!firstName || !lastName || !email || !password || !confirmPassword){
           
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match. Please try again"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        
        const user = await User.create({
            firstName, lastName, email, password:hashedPassword,
            
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        
        res.status(200).json({
            success:true,
            message:"User registered successfully",
            user
        })

    }catch(e){
        console.log(e)

        return res.status(500).json({
            success:false,
            message:"User can't be registered",
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body

        if(!email || !password){

            return res.status(403).json({
                success: false,
                message: "Enter all the details"
            })
        }
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User isn't registered. Please signup first"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {email:user.email, id: user._id}
            const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET)
            //ig setting expiry is optional

            user.token = token
            user.password = undefined

            return res.status(200).json({
                success:true,
                token,
                user,
                message: "Logged in successfully"
        })

        }else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
        
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error logging in",
        })
    }
}