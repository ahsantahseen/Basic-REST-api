const express=require('express')
const app=express();
const Logger=require('morgan')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const productsRoute=require('./routes/products')
const ordersRoute=require('./routes/orders')
const userRoute=require('./routes/user')

mongoose.connect(
    "mongodb+srv://ahsantahseen:"+process.env.MONGO_DB_PASSWORD+"@node-rest-api.ga9ns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser:true,
      useUnifiedTopology:true,
})
mongoose.Promise=global.Promise;

app.use(Logger('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*') //change to your own site if you have one and allow to use it only
    res.header('Access-Control-Allow-Headers',
    "Origin,X-Requested-With,Content-Type,Accept,Authorization")
    if(req.method==='OPTIONS'){ // req.method Check what method is used for http req (e.g GET POST etc...) 
           req.headers('Access-Control-Allow-Methods',"PUT,POST,PATCH,DELETE,GET")//All the methods you want to support
           res.status(100).json({
 
           })
    }
    next();
})

app.use('/products',productsRoute)
app.use('/orders',ordersRoute)
app.use('/user',userRoute)

app.use((req,res,next)=>{
    const error=new Error('Not Found!');
    error.stack=404;
    next(error)
})

app.use((error,req,res,next)=>{
res.status(error.status || 500)
res.json({
    error:{
        message:error.message
    }
})
})

module.exports=app;