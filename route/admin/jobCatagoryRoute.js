const express=require("express")
const jobCatagoryController = require("../../controller/admin/jobCatagoryController")
const jobCatagoryRouter=express.Router()

jobCatagoryRouter.get("/addjobcatagory",jobCatagoryController.addjobcatagory)
jobCatagoryRouter.post("/createjobcatagory",jobCatagoryController.createjobcatagory)

module.exports=jobCatagoryRouter