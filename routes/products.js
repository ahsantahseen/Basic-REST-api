const express=require('express')
const router=express.Router()
const Product=require('../models/products')
const mongoose=require('mongoose')


router.get('/',(req,res,next)=>{
    Product.find()
    .select('_id name price')
    .exec().then(docs=>{
        if(docs.length>=0){
            const response={
                count:docs.length,
                products:docs.map((doc)=>{
                    return{
                        ...docs,request:{
                            type:'GET',
                            url:'http//localhost:3000/products/'+doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
        }
        else{
            res.status(404).json({
                message:"No Entries Found!"
            })
        }
    }).catch(error=>{console.log(error)
    res.status(500).json({
        error:error
    })})
    }
    );

router.post('/',(req,res,next)=>{
    
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,

         
    })
    product.save().then(result=>{
        console.log(result)
        res.status(201).json({
            message:"Created Product Successfully!",
            createdProduct:{
                _id:result._id,
                name:result.name,
                price:result.price,
                request:{
                    type:"POST",
                    URL:'http//localhost:3000/products/'+result._id
                }

            }
        })
    }).catch(
        error=>{
            res.status(500).json({
                error:error
            })
            console.log(error)
        }
    )
})

router.get('/:productID',(req,res,next)=>{
    const id=req.params.productID;
    Product.findById(id)
    .select('_id name price').exec().then(
        doc=>{
            if(doc){
            res.status(200).json(
                {
                    _id:doc._id,
                    name:doc.name,
                    price:doc.price,
                    request:{
                        type:'GET',
                        url:'http//localhost:3000/products/'+doc._id
                    
                    }
                }
            )
            }
            else{
                res.status(404).json({
                    message:'No Valid! Entry Found!'
                })
            }
            
        }
    ).catch(
        error=>{
            console.log(error)
            res.status(500).json({
                error:error
            })
        }
    )
})

router.patch('/:productID',(req,res,next)=>{
    const id=req.params.productID
    const updateOps = {}
for (const key of Object.keys(req.body)) {
  updateOps[key] = req.body[key]
}

    Product.updateOne({
        _id:id
    },{$set:updateOps}).exec().then(result=>{
        
        res.status(200).json({
            message:"Product Successfully Updated!",
            Request:{
              type:"PATCH",
              URL:'http//localhost:3000/products/'+id      
            }
        })
    }).catch(
        error=>{
        console.log(error)
        res.status(500).json({
            error:error 
        })
    
    })
    
})
router.delete('/:productID',(req,res,next)=>{
    const id=req.params.productID
    Product.findByIdAndDelete({
        _id:id
    }).exec().then(
        result=>{
            res.status(200).json(
                {message:"Product Successfully Deleted!",
                Request:{
                  type:"DELETE",
                  URL:'http//localhost:3000/products/'+id  
                      
                },
                ObjectBody:{
                    name:"String",price:"number"
                }
            }
            )
        }
    ).catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:error
        })
    })

})
module.exports=router;