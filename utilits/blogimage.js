const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:path.join("./uplodedblogimage"),
    filename: function(req,file,cb){
    let ext=path.extname(file.originalname)
    cb(null,Date.now()+ext)
}
})

const blogimage=multer({ 
    storage:storage
})
module.exports=blogimage