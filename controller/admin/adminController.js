const adminModel=require("../../model/userModel")
const jobcatagory=require("../../model/jobCatagoryModel")
const job=require("../../model/jobModel")
const jwt=require("jsonwebtoken")
const bcryptjs=require("bcryptjs")
const path=require("path") 
const { hassedpassword, comparepassword } = require("../../middleware/auth")
 

class adminController{

    

    RegisterPage=(req,res)=>{
    return res.render("admin/register")
    }
    LoginPage=(req,res)=>{
    return res.render("admin/login")
    }
    dashboard=async(req,res)=>{ 
        try{
            const admindata=await adminModel.find()
            if(admindata)
            res.render("admin/dashboard",{
            data:req.admin
            }) 
        
        }catch(error){
            console.log(error);}
        
    }

    // admin register

    adminregister=async(req,res)=>{
        try{
            const {name,email,password}=req.body
            if(!(name&&email&&password)){
                console.log(`input field required`);
                return res.redirect('/admin/registerpage')
            }
            const matchemail=await adminModel.findOne({email})
            if(matchemail){
                console.log(`email exist`);
                return res.redirect("/admin/registerpage")
            }
            const hasspassword=await hassedpassword(password)
            const admin=new adminModel({
                name,
                email,
                password:hasspassword,role:"admin"
            })
            const admindata=await admin.save()
            if(admindata){
                return res.redirect("/admin/loginpage")
            }else{
                return res.redirect("/admin/registerpage")
            }
        }catch(error){
            console.log(error); 
        }
    }

    // admin login

    adminlogin=async(req,res)=>{
        try{
            const {email,password}= req.body
            const matchemail=await adminModel.findOne({email})
            if(!matchemail){
                console.log(`email is not registered`);
                return res.redirect("/admin/loginpage")
            }
            if(matchemail.role !=="admin"){
                res.redirect("/admin/loginpage")
                console.log(`only admin can log in`);
            }
            const matchpassword= await comparepassword(password,matchemail.password)
            if(!matchpassword){
                console.log(`password incorrect`);
                res.redirect("/admin/loginpage")
            }
    
            const token=await jwt.sign({
                _id:matchemail._id,
                name:matchemail.name,
                email:matchemail.email,
                role:matchemail.role
            },process.env.JWT_SECRET,{expiresIn:"12h"})
            if(token){
                res.cookie("adminToken",token)
                res.render("admin/dashboard")
            }
          
        }catch(error){
            console.log(error);
        }
    }
    logout = (req, res) => {
        res.clearCookie('adminToken')
        res.redirect('/admin/loginpage')
    }
    

    adminauthcheak=(req,res,next)=>{
        if(req.admin){
            next()
        }else{
            return res.redirect("/admin/register")
        }
    }

    jobcatagorypage=async(req,res)=>{
        try{
            const alljobcatagory=await  jobcatagory.find()
            if(alljobcatagory){
               return res.render("admin/jobcatagory",{
                jobcatagorydata:alljobcatagory
               })
            }
        }catch(error){
            console.log(error);
        }
    }
    cdeletejob=async(req,res)=>{
        const id=req.params.id
        const Delete = await jobcatagory.findByIdAndDelete(id)
        if(Delete){
            return res.redirect("/admin/jobcatagoryhome")
        }
      }
      cactive=async(req,res)=>{
        const tempDelete= await jobcatagory.findByIdAndUpdate(req.params.id,{status:0})
        if(tempDelete){
            res.redirect("/admin/jobcatagoryhome")
        }
      }
      cdeactive=async(req,res)=>{
        const tempDelete= await jobcatagory.findByIdAndUpdate(req.params.id,{status:1})
        if(tempDelete){
            res.redirect("/admin/jobcatagoryhome")
        }
      }


      jobpage=async(req,res)=>{
        try{
            const alljobcatagory=await  job.find()
            if(alljobcatagory){
               return res.render("admin/jobs",{
                jobdata:alljobcatagory
               })
            }
        }catch(error){
            console.log(error);
        }
    }

    deletejob=async(req,res)=>{
        const id=req.params.id
        const Delete = await job.findByIdAndDelete(id)
        if(Delete){
            return res.redirect("/admin/jobhome")
        }
      }
      active=async(req,res)=>{
        const tempDelete= await job.findByIdAndUpdate(req.params.id,{status:0})
        if(tempDelete){
            res.redirect("/admin/jobhome")
        }
      }
      deactive=async(req,res)=>{
        const tempDelete= await job.findByIdAndUpdate(req.params.id,{status:1})
        if(tempDelete){
            res.redirect("/admin/jobhome")
        }
      }




}


module.exports=new adminController()