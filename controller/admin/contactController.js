const contact=require("../../model/contactModel")
const adminModel=require("../../model/userModel")


class contactController{

contactpage = async (req,res)=>{
    try {
    const admindata=await adminModel.find()
     const contactData = await contact.find()
     if(contactData){
       res.render('admin/contact',{
         message : 'all data',
         Contact : contactData,
         data:req.admin
       })
     }
  } catch (error) {
   console.log(error);
  }
 }

}


module.exports=new contactController()