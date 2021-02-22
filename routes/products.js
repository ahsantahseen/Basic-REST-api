const express=require('express')
const router=express.Router()
const multer=require('multer')
const checkAuth=require('../middleware/check-auth')
const productController=require('../controllers/products')


const storage=multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
          cb(null,new Date().toISOString().replace(/:|\./g,'') +
          file.originalname)
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
        cb(null,true)
    }
    else{
        cb(new Error('File Cannot Be Stored! Check requirements'),false)
    }
}
const upload=multer({storage:storage,limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter,
});

router.get('/',productController.products_get_all);
router.post('/',checkAuth,upload.single('productImage'),productController.products_post)
router.get('/:productID',productController.products_get_by_id)
router.patch('/:productID',checkAuth,productController.products_patch_by_id)
router.delete('/:productID',checkAuth,productController.products_delete_by_id)

module.exports=router;