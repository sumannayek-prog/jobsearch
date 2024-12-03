const express=require("express")
const userController = require("../../controller/user/userController")
const { jwtUserauth } = require("../../middleware/auth")
const frontRouter=express.Router()

frontRouter.get("/registerpage",userController.registerpage)
frontRouter.post("/register",userController.userregister)
frontRouter.get("/",userController.loginpage) 
frontRouter.post("/login",userController.userlogin)
frontRouter.post("/confirmation/:email/:token",userController.confirmation)
frontRouter.get("/home",jwtUserauth,userController.userauthcheak,userController.homepage)
frontRouter.get("/blog",userController.blogpage)
frontRouter.get("/about",userController.aboutpage)
frontRouter.get("/logout",userController.logout)
frontRouter.get("/details:id",jwtUserauth,userController.userauthcheak,userController.jobdetailspage)
frontRouter.get("/joblist",jwtUserauth,userController.userauthcheak,userController.jobpage)

frontRouter.get("/contact",userController.contactpage)
frontRouter.post("/createcontact",userController.CreateContact)

frontRouter.get("/apply",jwtUserauth,userController.userauthcheak,userController.applypage)
frontRouter.post("/cly",jwtUserauth,userController.userauthcheak,userController.Createapply)

frontRouter.get("/searchdata/:keyword",userController.search)
frontRouter.get("/marketing",userController.Marketing)
frontRouter.get("/customerservice",userController.CustomerService)
frontRouter.get("/humanresource",userController.HumanResource)
frontRouter.get("/projectmanagement",userController.ProjectManagement)
frontRouter.get("/businessdevelopment",userController.BusinessDevelopment)
frontRouter.get("/salesandcommunication",userController.SalesAndCommunication)
frontRouter.get("/teachingandeducation",userController.TeachingAndEducation)
frontRouter.get("/designandcreative",userController.DesignAndCreative)
frontRouter.get("/fullTime",userController.FullTime)
frontRouter.get("/partTime",userController.PartTime)
frontRouter.get("/freelancer",userController.Freelancer)


frontRouter.get("/forgetpassword",userController.userforgetpassword)
frontRouter.post("/forgetpasswordpost",userController.userforgetpasswordpost)


frontRouter.get("/updatepassword",userController.userupdatepassword)
frontRouter.post("/updatepasswordpost:id",userController.userupdatepasswordpost)

module.exports=frontRouter
