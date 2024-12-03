const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uplodedbannerimage/")
    
},
    filename: function(req,file,cb){
    let ext=path.extname(file.originalname)
    cb(null,Date.now()+ext)
}
})

const image=multer({
    storage:storage

})
module.exports=image