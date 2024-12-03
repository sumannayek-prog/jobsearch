
const jobcatagory=require("../../model/jobCatagoryModel")

class jobCatagoryController{
addjobcatagory=async(req,res)=>{
    try{
        const cdata=await jobcatagory.find()
        //console.log(cdata);
        if(cdata){
            res.render("admin/addjobcatagory",{
                catagory_data:cdata
        }
        )}
    }catch(error){console.log(error);}
    
  }
  
createjobcatagory=async(req,res)=>{
    try{
        const{jobcatagoryname}=req.body
        console.log("dd",req.body);
        const newJob = new jobcatagory({
          jobcatagoryname:req.body.jobcatagoryname
          })
          const alljob =await newJob.save()
          console.log(alljob);
          if(alljob){
            return res.redirect("/admin/addjobcatagory")
          }
    }catch(error){
        console.log(error)
    }
}
}

module.exports=new jobCatagoryController()