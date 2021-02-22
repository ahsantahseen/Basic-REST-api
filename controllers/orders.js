const Order=require('../models/orders')
const Product=require('../models/products')

const mongoose=require('mongoose');

exports.orders_get_all=(req,res,next)=>{
    Order.find().select('_id product quantity').populate('product','name price').exec().then((docs)=>{
        res.status(200).json({
            count:docs.length,
            order:docs.map((doc)=>{
                return{
                _id:doc._id,
                product:doc.product,
                quantity:doc.quantity,
                request:{
                    type:"GET",
                    URL:"http://localhost:3000/orders/"+doc._id
                }
                }

            }),
            
        })
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:error,
        })
    })
}

exports.orders_post=(req,res,next)=>{
    Product.findById(req.body.productId).then(product=>{
        if(!product){
            return res.status(404).json({
                message:'Product not found!'
            })
        }
        const order=new Order({
            _id:mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product:req.body.productId,
        })
       return order.save()
        
    }).then((result)=>{
        console.log(result)
        res.status(201).json(
            {
                message:"Order Successfully Stored!",
                CreatedOrder:{
                 _id:result._id,
                 product:result.product,
                 quantity:result.quantity
                },
                request:{
                    type:"POST",
                    URL:"http://localhost:3000/orders/"+result._id
                }
            }
        )
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({
             error:error,
        })
    })

}
exports.orders_get_by_id=(req,res,next)=>{
    
    Order.findById(req.params.orderId).select('_id product quantity').populate('product','name price').exec().then(
        order=>{
            if(!order){
                return res.status(404).json({
                    message:'Order not found!'
                })
            }
            res.status(200).json({
                order:order,
                request:{
                    type:"GET",
                    URL:'http://localhost:3000/orders'
                }
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                error:error
            })
        }
    )
}
exports.order_delete_by_id=(req,res,next)=>{
    
    Order.findByIdAndDelete({_id:req.params.orderId}).exec().then(
        result=>{
            if(!result){
                return res.status(404).json({
                    message:'Order not found!'
                })
            }
            res.status(200).json({
                message:"Order Deleted!",
                request:{
                    type:"POST",
                    URL:'ttp://localhost:3000/orders',
                    body:{productId:"ID",quantity:"Number "}
                }
            })
        }
    ).
    catch((error)=>{
      res.status(500).json({
          error:error
      })
    })
}