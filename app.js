const express=require("express")
const app=express() 
const ejs=require("ejs")
const dotenv=require("dotenv")
const path=require("path")
const flash=require('connect-flash');
const cookieparser=require('cookie-parser');
const session=require('express-session');
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const mongoconnect=require("./config/database")
const cookieParser=require('cookie-parser')

dotenv.config()
mongoconnect()

app.set("view engine","ejs")
app.set("views","views")

app.use(flash());
app.use(cookieparser());
app.use(session({
    cookie:{maxAge:5000},
    secret:'nodejs',
    resave:false,
    saveUninitialized:false
}))

app.use(express.static(path.join(__dirname,"public")))
app.use("/uplodedbannerimage",express.static("uplodedbannerimage"))
app.use("/uplodedblogimage",express.static("uplodedblogimage"))
app.use("/catagorylogo",express.static("catagorylogo"))
// app.use("/uplodedcvimage",express.static("uplodedcvimage"))
app.use(cookieParser())

const adminRouter=require("./route/admin/adminRoute")
app.use("/admin",adminRouter)

const bannerRouter=require("./route/admin/bannerRoute")
app.use("/admin",bannerRouter)

const contactRoute=require("./route/admin/contactRoute")
app.use("/admin",contactRoute)

const jobcatagoryRoute=require("./route/admin/jobCatagoryRoute")
app.use("/admin",jobcatagoryRoute)

const applyRoute=require("./route/admin/applyRoute")
app.use("/admin",applyRoute)

const blogRouter=require("./route/admin/blogRoute")
app.use("/admin",blogRouter)


const marchentRouter=require("./route/marchent/marchentRoute")
app.use(marchentRouter)


// const jobRouter=require("./route/jobRoute")
// app.use("/marchent",jobRouter)

const frontRoute=require("./route/user/frontRoute")
app.use(frontRoute)

const port= process.env.PORT||6565
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})