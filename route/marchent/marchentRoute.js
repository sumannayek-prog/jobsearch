const express=require("express")
const marchentController = require("../../controller/marchent/marchentController")
const { jwtMarchentauth } = require("../../middleware/auth")
const catagoryimage=require("../../utilits/catagorylogo")
const marchentRouter=express.Router()

marchentRouter.get("/mregisterpage",marchentController.RegisterPage)
marchentRouter.get("/mloginpage",marchentController.LoginPage)
marchentRouter.post("/mregister",marchentController.marchentregister)
marchentRouter.post("/mlogin",marchentController.marchentlogin)
//marchentRouter.get("/addjobcatagory",jwtMarchentauth,marchentController.marchentauthcheak,marchentController.addjobcatagory)
// marchentRouter.post("/createjobcatagory",marchentController.createjobcatagory)
marchentRouter.get("/postpage",marchentController.postjobpage)
marchentRouter.post("/postjob",catagoryimage.single("image"),marchentController.jobcreate)


module.exports=marchentRouter 