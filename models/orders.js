const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{type:Number,default:1}//We can set it 1 as a default or can just set it to req but we have to pass value everytime
})

module.exports=mongoose.model('Order',orderSchema)