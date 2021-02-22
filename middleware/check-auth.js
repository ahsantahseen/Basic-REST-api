const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]; //accessing the token not the bearer part
const decoded=jwt.verify(token,process.env.JWT_KEY);
next()
req.userData=decoded
    }
    catch(error){
        return res.status(401).json({
            message:'Authentication Failed'
        })
    }
}