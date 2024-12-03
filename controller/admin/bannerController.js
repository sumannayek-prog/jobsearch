const banner=require('../../model/bannerModel')
const adminModel=require("../../model/userModel")
const path=require("path")


class  bannerController{


bannerpage=async(req,res)=>{
    try{
        const admindata=await adminModel.find()
        const allbanner=await  banner.find()
        if(allbanner){
           return res.render("admin/banner",{
            banner_data:allbanner,
            data:req.admin
           })
        }
    }catch(error){
        console.log(error);
    }
}

addbanner=(req,res)=>{
    res.render("admin/addbanner")
}

createbanner=async(req,res)=>{
    try{
        const{title,subtitle,image}=req.body
        console.log(req.body);
        const nbanner=await new banner({
            title,
            subtitle,
            image
        })
        if(req.file){
            nbanner.image=req.file.path
         }
        const response=await nbanner.save()
        if(response){
            console.log(`data add successfully`)
            return res.redirect("/admin/banner")
        }else{
            return res.redirect("/admin/addbanner")
        }
    }catch(error){
        console.log(error);
    }
}
editbanner=async(req,res)=>{
    try{
        const id=req.params.id
        const Editbanner=await banner.findById(id)
        if(Editbanner){
            return res.render('admin/editbanner',{
                edit:Editbanner
            })
            
        }
    }catch(error){console.log(`edit is not possible`);}
}
updatebanner=async(req,res)=>{
    try{
        const id=req.params.id
        const nimage=req.file.path
        const update=await banner.findByIdAndUpdate(
            id,{
                title:req.body.title,
                subtitle:req.body.subtitle,
                image:nimage
            },
            {new:true}
        )
         if(req.file){
             update.image=req.file.path
        }
        if(update){
            return res.redirect("/admin/banner")
        }else{
            return res.redirect("/admin/addbanner")
        }
    }catch(error){console.log(error);}
}
deletebanner=async(req,res)=>{
    const id=req.params.id
    const Delete = await banner.findByIdAndDelete(id)
    if(Delete){
        return res.redirect("/admin/banner")
    }
}
active=async(req,res)=>{
    const tempDelete= await banner.findByIdAndUpdate(req.params.id,{status:0})
    if(tempDelete){
        res.redirect("/admin/banner")
    }
}
deactive=async(req,res)=>{
    const tempDelete= await banner.findByIdAndUpdate(req.params.id,{status:1})
    if(tempDelete){
        res.redirect("/admin/banner")
    }
}

}
module.exports=new bannerController()