const express=require('express')
const router=express.Router()

const checkAuth=require('../middleware/check-auth')
const userController=require('../controllers/users')


router.post("/signup",userController.user_signIn)

router.post('/login',userController.user_logIn)

router.delete("/:userId",checkAuth,userController.user_delete_user_by_id)

module.exports=router