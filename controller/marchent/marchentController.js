const marchentModel=require("../../model/marchentModel")
const jobModel=require("../../model/jobModel")
const jobcatagory=require("../../model/jobCatagoryModel")
const jwt=require("jsonwebtoken")
const bcryptjs=require("bcryptjs")
const path=require("path") 
const { hassedpassword, comparepassword } = require("../../middleware/auth")
const { log } = require("console")


class marchentController{

    

    RegisterPage=(req,res)=>{
    return res.render("marchent/register",{data: req.marchent})
    }
    
    LoginPage=async(req,res)=>{
        try{
            const alldata=await jobcatagory.find()
        if(alldata){
        return res.render("marchent/login",{
        catagory_data:alldata
    })
    }
    }catch(error){
        console.log(error);
    }
    }


    // marchent register

    marchentregister=async(req,res)=>{
        try{
            const {name,email,password}=req.body
            if(!(name&&email&&password)){
                console.log(`input field required`);
                return res.redirect('/mregisterpage')
            }
            const matchemail=await marchentModel.findOne({email})
            if(matchemail){
                console.log(`email exist`);
                return res.redirect("/mregisterpage")
            }
            const hasspassword=await hassedpassword(password)
            const marchent=new marchentModel({
                name,
                email,
                password:hasspassword
            })
            const marchentdata=await marchent.save()
            if(marchentdata){
                return res.redirect("/mloginpage")
            }else{
                return res.redirect("/mregisterpage")
            }
        }catch(error){
            console.log(error); 
        }
    }

    // marchent login

    marchentlogin=async(req,res)=>{
        try{
            const {email,password}= req.body
            const matchemail=await marchentModel.findOne({email})
            if(!matchemail){
                console.log(`email is not registered`);
                return res.redirect("/mloginpage")
            }
            if(matchemail.role !=="marchent"){
                res.redirect("/mloginpage")
                console.log(`only marchent can log in`);
            }
            const matchpassword= await comparepassword(password,matchemail.password)
            if(!matchpassword){
                console.log(`password incorrect`);
                res.redirect("/mloginpage")
            }
    
            const token=await jwt.sign({
                _id:matchemail._id,
                name:matchemail.name,
                email:matchemail.email,
                role:matchemail.role
            },process.env.JWT_SECRET,{expiresIn:"12h"})
            if(token){
                res.cookie("marchentToken",token)
                res.render("marchent/addjobcatagory")
            }
          
        }catch(error){
            console.log(error);
        }
    }

    marchentauthcheak=(req,res,next)=>{
        if(req.marchent){
            next()
        }else{
            return res.redirect("/mregister")
        }
    }

    // addjobcatagory=async(req,res)=>{
    //     try{
    //         const cdata=await jobcatagory.find()
    //         //console.log(cdata);
    //         if(cdata){
    //             res.render("marchent/addjobcatagory",{
    //                 catagory_data:cdata
    //         }
    //         )}
    //     }catch(error){console.log(error);}
        
    //   }
      
    // createjobcatagory=async(req,res)=>{
    //     try{
    //         const{jobcatagoryname}=req.body
    //         console.log("dd",req.body);
    //         const newJob = new jobcatagory({
    //           jobcatagoryname:req.body.jobcatagoryname
    //           })
    //           const alljob =await newJob.save()
    //           console.log(alljob);
    //           if(alljob){
    //             return res.redirect("/addjobcatagory")
    //           }
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    postjobpage=async(req,res)=>{
        try{
            const alldata=await jobcatagory.find()
            console.log(alldata);
        if(alldata){
        res.render("marchent/addjob",{
            catagory_data:alldata
        })
        }
    }catch(error){
        console.log(error);
    }
        
    }  

     

    

    jobcreate = async (req,res)=>{

        try {    
          const {jobtitle,company,location,job_des,job_qualification,salary,category,job_nature,deadline} = req.body
        //   console.log("ff",req.body);  
          const newjob =await new jobModel({
            jobtitle: req.body.jobtitle,
            company: req.body.company,
            location: req.body.location,
            job_des: req.body.job_des,
            job_qualification: req.body.job_qualification,
            salary: req.body.salary,
            category: req.body.category,
            job_nature: req.body.job_nature,
            deadline: req.body.deadline
          })
          if(req.file){
                newjob.image=req.file.path
             }
          const responce =await newjob.save()
          
            if(responce){
                req.flash('message', "Jobpost added successfully..")
                return res.redirect("/postpage" )
            }else{
                req.flash('error', "Jobpost NOT added")
                return res.redirect("/postpage")
            }
        } catch (error) {
          console.log(error);
        }
      }


    

      

}
module.exports=new marchentController()  