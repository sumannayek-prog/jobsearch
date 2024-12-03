const express=require("express")
const bannerRouter=express.Router()
const bannerimage=require("../../utilits/bannerimages")
const bannerController = require("../../controller/admin/bannerController")

bannerRouter.get("/banner",bannerController.bannerpage)
bannerRouter.get("/addbanner",bannerController.addbanner)
bannerRouter.post("/createbanner",bannerimage.single("image"),bannerController.createbanner)
bannerRouter.get("/editbanner:id",bannerController.editbanner)
bannerRouter.get("/deletebanner:id",bannerController.deletebanner)
bannerRouter.post("/updatebanner:id",bannerimage.single("image"),bannerController.updatebanner)
bannerRouter.get("/active:id",bannerController.active)
bannerRouter.get("/deactive:id",bannerController.deactive)

module.exports=bannerRouter