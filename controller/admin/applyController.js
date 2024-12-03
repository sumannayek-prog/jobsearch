const applymodel=require("../../model/applyModel")
const adminModel=require("../../model/userModel")



class applyController{

applypage = async (req,res)=>{
    try {
    const admindata=await adminModel.find()
     const contactData = await applymodel.find()
     if(contactData){
       res.render('admin/apply',{
         message : 'all data',
         apply : contactData,
         data:admindata
       })
     }
  } catch (error) {
   console.log(error);
  }
 }

}


module.exports=new applyController()