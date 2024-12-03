const express=require("express")
const applyController = require("../../controller/admin/applyController")
const contactRouter=express.Router()

contactRouter.get("/aapply",applyController.applypage)


 module.exports=contactRouter