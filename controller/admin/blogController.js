const blog=require('../../model/blogModel')
const adminModel=require("../../model/userModel")
const path=require("path") 

class blogController{


blogpage=async(req,res)=>{
    try{
        const admindata=await adminModel.find()
        const allblog=await  blog.find()
        if(allblog){
           return res.render("admin/blogadmin",{
            blog_data:allblog,
            data:req.admin
           })
        }
    }catch(error){
        console.log(error);
    }
}

addblog=(req,res)=>{
    res.render("admin/addblog")
}

createblog=async(req,res)=>{

    try{
        const{aboutblog,blogername}=req.body
        const nblog=await new blog({
            aboutblog,
            blogername
        })
        if(req.file){
            nblog.image=req.file.path
        }
        const response=await nblog.save()
        if(response){
            console.log(`data add successfully`)
            res.redirect("/admin/dashboard")
        }else{
            return res.redirect("/admin/addblog")
        }
    }catch(error){
        console.log(error);
    }
}
deleteblog=async(req,res)=>{
    const id=req.params.id
    const Delete = await blog.findByIdAndDelete(id)
    if(Delete){
        return res.redirect("/admin/blog")
    }
}

}

module.exports=new blogController()