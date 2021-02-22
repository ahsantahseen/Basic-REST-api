const express=require('express')
const router=express.Router()

const checkAuth=require('../middleware/check-auth')

const ordersController=require('../controllers/orders.js')


//Handling REQUESTS TO THE ROUTES THEN TO THE CONTROLLERS AFTER TOKEN VERIFICATION
router.get('/',checkAuth,ordersController.orders_get_all)
router.post('/',checkAuth,ordersController.orders_post)
router.get('/:orderId',checkAuth,ordersController.orders_get_by_id)
router.delete('/:orderId',checkAuth,ordersController.order_delete_by_id)

module.exports=router;