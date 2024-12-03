const express=require("express")
const adminController = require("../../controller/admin/adminController")
const { jwtadminauth } = require("../../middleware/auth")
const AdminRouter=express.Router()

AdminRouter.get("/registerpage",adminController.RegisterPage)
AdminRouter.get("/loginpage",adminController.LoginPage)
AdminRouter.post("/register",adminController.adminregister)
AdminRouter.post("/login",adminController.adminlogin)
AdminRouter.get("/dashboard",jwtadminauth,adminController.adminauthcheak,adminController.dashboard)
AdminRouter.get('/logout',jwtadminauth,adminController.logout)

AdminRouter.get("/jobcatagoryhome",adminController.jobcatagorypage)
AdminRouter.get("/active:id",adminController.cactive)
AdminRouter.get("/deactive:id",adminController.cdeactive)
AdminRouter.get("/deletejob:id",adminController.cdeletejob)

AdminRouter.get("/jobhome",adminController.jobpage)
AdminRouter.get("/active:id",adminController.active)
AdminRouter.get("/deactive:id",adminController.deactive)
AdminRouter.get("/deletejob:id",adminController.deletejob)

module.exports=AdminRouter 