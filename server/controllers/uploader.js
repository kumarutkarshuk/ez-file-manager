const { uploadOnCloudinary } = require("../utils/cloudinary")

exports.uploader = async (req, res)=>{
    
    const response = await uploadOnCloudinary(req.file.path)

    // console.log(req.file.path);

    res.status(200).json({
        success:true,
        message:"File upload successful",
        url: response
    })

}