const express=require("express")
const contactController = require("../../controller/admin/contactController")
const contactRouter=express.Router()

contactRouter.get("/contact",contactController.contactpage)


 module.exports=contactRouter