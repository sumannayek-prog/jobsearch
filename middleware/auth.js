const jwt=require("jsonwebtoken")
const bcryptjs=require("bcryptjs")


const hassedpassword=async(password)=>{
    try{
      return  await bcryptjs.hash(password,10)
    }catch(error){
        console.log(error);
    }
}
const comparepassword=async(password,saltpassword)=>{
    try{
      return  await bcryptjs.compare(password,saltpassword)
}catch(error){
    console.log(error);
}
}
const jwtadminauth=(req,res,next)=>{
    if(req.cookies && req.cookies.adminToken){
        jwt.verify(req.cookies.adminToken,process.env.JWT_SECRET,(error,data)=>{
            req.admin=data
            next()
        })
        console.log("df",req.admin);
    }else{
        console.log(`login first`);
        next()
    }
}
const jwtUserauth = (req,res,next)=>{
    if(req.cookies && req.cookies.usertoken){
      jwt.verify(req.cookies.usertoken , process.env.JWT_SECRET,(err,data)=>{
        req.user = data
        next()
      })
      //console.log('ll' , req.user);
    }else{
      console.log('Please login');
      next()
    }
  }
  const jwtMarchentauth = (req,res,next)=>{
    if(req.cookies && req.cookies.marchentToken){
      jwt.verify(req.cookies.marchentToken , process.env.JWT_SECRET,(err,data)=>{
        req.marchent = data
        next()
      })
      console.log('ll' , req.marchent);
    }else{
      console.log('Please login');
      next()
    }
  }



module.exports={
    hassedpassword,
    comparepassword,
    jwtadminauth,
    jwtUserauth,
    jwtMarchentauth
}