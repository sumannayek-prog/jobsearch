const banner=require("../../model/bannerModel")
const userModel=require("../../model/userModel")
const blog=require("../../model/blogModel")
const contact=require('../../model/contactModel')
const categorymodel=require('../../model/jobCatagoryModel')
const job=require('../../model/jobModel')
const tokenModel=require('../../model/tokenModel')
const AcitvityModel=require('../../model/applyModel')
const crypto = require("crypto");
const jwt=require("jsonwebtoken")
const { hassedpassword, comparepassword } = require("../../middleware/auth")
const { transport, mailSender } = require("../../utilits/utils");
          

class userController{
 homepage=async(req,res)=>{
    try{
        const allbanner=await banner.find()
        const allblog=await blog.find()
        const alljobdetails=await job.find()
        
        if(allbanner){
        res.render("user/home",{
        message: req.flash('message'),
        error: req.flash('error'),
        bannerdata:allbanner,
        blogdata:allblog,
        jobdata:alljobdetails,
        data:req.user
    })
    }
}catch(error){
    console.log(error);
}
}

blogpage=async(req,res)=>{
    try{
    const allblog=await blog.find()
    res.render("user/blog",{
        blogdata:allblog,
        data:req.user
    })
    }catch(error){
        console.log(error);
    }
}
registerpage=(req,res)=>{
    res.render("user/register", {
        message: req.flash('message'),
        error: req.flash('error'),
        data: req.user,

    })
}

userregister=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!(name&&email&&password)){
            console.log(`input field required`);
            return res.redirect('/registerpage')
        }
        const matchemail=await userModel.findOne({email})
        if(matchemail){
            console.log(`email exist`);
            return res.redirect("/registerpage")
        }
        const hasspassword=await hassedpassword(password)
        const admin=new userModel({
            name,
            email,
            password:hasspassword
        })
        const admindata=await admin.save()
        if(admindata){
            const token_model=new tokenModel({
                    _userId: admindata._id,
                    token: crypto.randomBytes(16).toString('hex')
                })
            const tokendata=await token_model.save()
            if(tokendata){
            const senderEmail = "sumannayek172@gmail.com";
            const password= "bmie gfdk fagn tiok";
            var transporter  = transport(senderEmail,password)
            var mailoptions = {
                    from: 'default@gmail.com',
                    to: admindata.email,
                    subject: 'Account Verification',
                    text: 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + admindata.email + '\/' + tokendata.token + '\n\nThank You!\n'
                }
                mailSender(req,res,transporter,mailoptions);
            }
            }
    }catch(error){
        console.log(error); 
    }
}
confirmation=async(req,res)=>{
    try{
        const token=await tokenModel.findOne({token:req.params.token})
        if(!token){
            console.log("verification link may be expired");
        }else{
            const user= await adminModel.findOne({_id:token._userId,email : req.params.email})
            if(!user){
                req.flash('error', "User Not found");
                res.redirect("/login")
                console.log("User not found");
            }else if(user.isVerified){
                req.flash("error", "User Already Verified");
                console.log("user is already verified");
            }else{
                user.isVerified = true;
                const result=await user.save()
                req.flash("message", "Your Account Verified Successfully");
                console.log("user verifed successFully")
                res.redirect("/login")
            }
        }
    }catch(error){
        console.log(error);
    }
}


loginpage=(req,res)=>{
    res.render("user/login",{
        message: req.flash('message'),
        error: req.flash('error'),
        data:req.user
    })
}

userlogin=async(req,res)=>{ 
    try{
        const {email,password}=req.body
        if(!(email&&password)){
            console.log(`email exist`);
        }
        const matchemail=await userModel.findOne({email})
        if(!matchemail){
            console.log(`email is not registered`);
            return res.redirect("/")
        }
        if(matchemail.status == 0 ){
            console.log('You are not authorised to access');
            res.redirect('/login')
        }
        const matchpassword= await comparepassword(password,matchemail.password)
        if(!matchpassword){
            console.log(`password incorrect`);
            return res.redirect("/")
        }

        const token=await jwt.sign({
            name:matchemail.name,
            email:matchemail.email
        },process.env.JWT_SECRET,{expiresIn:"1hr"})
        if(token){
            req.flash("massage","login successfully")
            req.flash('message', "Login successfully..")
            res.cookie("usertoken",token)
            res.redirect("/home")
        }
      
    }catch(error){
        console.log(error);
    }
}
logout = (req, res) => {
    res.clearCookie('usertoken')
    res.redirect('/')
}
aboutpage=(req,res)=>{
    res.render("user/about",{
        data:req.user
    })
}

contactpage=async(req,res)=>{
    try{
        const datas= await userModel.find()
        const contactdata=await contact.find()
        if(contactdata){
            res.render("user/usercontact",{
                contact:contactdata,
                data:datas
            })
        }
    }catch(error){console.log(error);}
}


CreateContact = async (req,res)=>{ 
    try {
        const {name, email, sub, sms} = req.body
        const newContact = new contact ({
            name,
            email,
            sub, 
            sms
        })
       const newData =  await newContact.save()
       if(newData){
        res.render('user/usercontact')  
       }
    } catch (error) {
      res.render('user/usercontact')    
    }
  }

applypage=async(req,res)=>{
    try{
        const jdata=await job.find()
        const datas= await userModel.find()
        const apply=await AcitvityModel.find()
        if(apply){
            res.render("user/applypage",{
                message: req.flash('message'),
                error: req.flash('error'),
                data:datas,
                job_data:jdata
            })
        }
    }catch(error){console.log(error);}
}

Createapply = async (req,res)=>{ 
    try {  
        const datas= await userModel.findById(req.user.id)
        console.log(datas);
        const jdata=await job.find()
        const {sms,category,job_company,location,job_title} = req.body
        const newapply =await new AcitvityModel ({
            // name:datas.name,
            // email:datas.email, 
            sms,
            job_title,
            category,
            job_company,
            location
        })
        
       const newData =  await newapply.save()
       if(newData){
        req.flash('message', "Job Applied Successfully")
        res.redirect("/home")
       }
    } catch (error) {
        res.redirect("/apply")
        console.log(error); 
    }
  }




userauthcheak=(req,res,next)=>{
    if(req.user){
        next()
    }else{
        return res.redirect("/loginpage")
    }
}

jobpage=async(req,res)=>{
    try{
    const datas= await userModel.find()
    const alljobdetails=await job.find()
    res.render("user/joblist",{
        message: req.flash('message'),
        error: req.flash('error'),
        jobdata:alljobdetails,
        data:datas
    })
    }catch(error){
        console.log(error);
    }
}
jobdetailspage=async(req,res)=>{
    try{
    const datas= await userModel.find()
    const alljobdetails=await job.findById(req.params.id)
    res.render("user/jobdetails",{
        jobdetailsdata:alljobdetails,
        data:datas
    })
    }catch(error){
        console.log(error);
    }
}


Marketing=async(req,res)=>{

    try{
        const result = await job.aggregate([
            { $match: { "category": "Marketing" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}
CustomerService=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "category": "Customer Service" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}
HumanResource=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "category": "Human Resource" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}
ProjectManagement=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "category": "Project Management" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}
BusinessDevelopment=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "category": "Business Development" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}
SalesAndCommunication=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "category": "Sales And Communication" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}
TeachingAndEducation=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "category": "Teaching And Education" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}
DesignAndCreative=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "category": "Design And Creative" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}


Freelancer=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "job_nature": "Freelancer" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}

PartTime=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "job_nature": "Part-Time" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}

FullTime=async(req,res)=>{
    try{
        const result = await job.aggregate([
            { $match: { "job_nature": "Full-Time" } },
            { $sort: { 'createdAt': -1 } }
        ]);
        const datas= await userModel.find()
        const result2 = await categorymodel.find();

        res.render('user/joblist', {
            data: datas,
            jobdata: result,
            displayData2: result2
        })
    }catch(error){
        console.log(error);
    }
}


search=async(req,res)=>{
    try {
        const { keyword } = req.params;
        const resutls = await job
          .find({
            $or: [
              { company: { $regex: keyword, $options: "i" } },
              //{ postText: { $regex: keyword, $options: "i" } },
            ],
          })
          const datas= await userModel.find()
          if(resutls){
            res.render('user/joblist', {
                    data: datas,
                    jobdata: resutls
                });
          }
        // res.render('user/joblist', {
        //     data: datas,
        //     jobdata: resutls
        // });
      } catch (error) {
        console.log(error)
    }
}

userforgetpassword = (req,res)=>{
    res.render('user/forgetpassword')
  }

userforgetpasswordpost = async (req,res)=>{
    try {
      const {name,email,newPassword} = req.body
    if(!(name && email)){
      return res.redirect('/forgetpassword')
    }
    const user = await userModel.findOne({name,email})
    if(!user){
      console.log('Name or email not matched');
      return res.redirect('/forgetpassword')
    }
    const hashpassword = await hassedpassword(newPassword)
    const updateUser = await userModel.findByIdAndUpdate({_id: user._id},{
      password : hashpassword
    })
    if(updateUser){
      res.redirect('/')
    }
    
    } catch (error) {
      console.log(error);
      return res.redirect('/forgetpassword')
    }
    
  }



  userupdatepassword = async(req,res)=>{
    res.render('user/updatepassword',{
      data : req.user
    })
  }

  userupdatepasswordpost = async (req,res)=>{
    try {
      const id = req.params.id
      const {password} = req.body
      const data = await userModel.findById(id)

      if(data){
        const newPwd = await hassedpassword(password)
        const userDate = await userModel.findByIdAndUpdate(id,{
          name : req.body.name,
          email : req.body.email,
          password : newPwd
        },{new :true})
        if(userDate){       
          console.log('Update all details successfully');
          res.redirect('/home')
        }
      }else{
        console.log('User Id not found');
      }        
    } catch (error) {
      console.log(error);
      res.redirect("/updatepassword")
    }
  } 



}
module.exports=new userController()