const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

exports.auth = async(req, res, next) => {
    try{
        
        const token = req.body.token
        // console.log(req.body);
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
         try{
            const decode =  jsonwebtoken.verify(token, process.env.JWT_SECRET)
            
            req.user = decode

         }catch(e){
            return res.status(401).json({
                success:false,
                message:"error decoding token",
                
            })
         }
         next()
        
    }catch(e){
        // console.log(e.message)
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }


}