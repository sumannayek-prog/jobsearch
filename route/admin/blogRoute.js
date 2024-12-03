const express=require("express")
const blogRouter=express.Router()
const blogimage=require("../../utilits/blogimage")
const blogController = require("../../controller/admin/blogController")



blogRouter.get("/blog",blogController.blogpage)
blogRouter.get("/addblog",blogController.addblog)
blogRouter.post("/createblog",blogimage.single('image'),blogController.createblog)
blogRouter.get("/deleteblog:id",blogController.deleteblog)


 module.exports=blogRouter