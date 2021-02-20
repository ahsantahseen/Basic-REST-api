const express=require('express')
const router=express.Router()
const Product=require('../models/products')
const mongoose=require('mongoose')


router.get('/',(req,res,next)=>{
    Product.find()
    .exec().then(docs=>{
        if(docs.length>=0){

            console.log(docs)
            res.status(200).json(docs)
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
            message:"HANDLING POST REQ to /products",
            createdProduct:result
        })
    }).catch(
        error=>{
            res.status(500).json({
                error:error
            })
            console.log(error)
        }
    )
    res.status('201').json({
        message:"We are in POST",
        createdProduct:product
    })
})

router.get('/:productID',(req,res,next)=>{
    const id=req.params.productID;
    Product.findById(id).exec().then(
        doc=>{
            if(doc){
                console.log("FROM DATABASE",doc)
            res.status(200).json(
                doc
            )
            }
            else{
                res.status(404).json({
                    message:'No Entry Found!'
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
        console.log(result)
        res.status(200).json(result)
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
                result
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