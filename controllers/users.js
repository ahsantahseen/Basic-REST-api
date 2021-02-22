const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/user')

exports.user_signIn=(req,res,next)=>{
    User.findOne({email:req.body.email}).exec().then(user=>{
        if(user){
            return res.status(409).json({
                message:'The Requested Mail already exists'
            })
        }
        else{
            bcrypt.hash(req.body.password, 11, (err, hash)=> {
                if(err){
                   return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    })
                    user.save().then(result=>{
                        console.log(result)
                        res.status(200).json({
                            message:"User Successfully created!"
                        })
                    }).catch((error)=>{
                        console.log(error)
                        res.status(500).json({
                            error:error
                        })
                    })
                }
            });
        }
    })
}

exports.user_logIn=(req,res,next)=>{
    User.findOne({email:req.body.email}).exec().then(
        user=>{
            console.log(user)
            if(!user){
               return res.status(401).json({
                   message:"Authorization Failed!"
               })
            }
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(err){
                   return res.status(401).json({
                        message:"Authorization Failed"
                    })
                }
                if(result){
                    const token=jwt.sign({
                        email:user.email,
                        userId:user.userId
                    },process.env.JWT_KEY,
                    {
                        expiresIn:"1h"
                    })
                    return res.status(200).json({
                        message:"Authorization Successful",
                        token:token,
                    })
                }
                 res.status(401).json({
                    message:"Authorization Failed"
                })
            })
        }
    ).catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:error
        })
    })
}
exports.user_delete_user_by_id=(req,res,next)=>{
    User.findByIdAndDelete({ _id:req.params.userId}).exec().then(result=>{
        if(!result){
            res.status(404).json({
                message:"User not found!"
            })
        }
        res.status(200).json({
            message:"User SuccesFully Deleted!"
        })
    }).catch(error=>{
        console.log(error)
        res.status(500).json({
            error:error
        })
    })
}