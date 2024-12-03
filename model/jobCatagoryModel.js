const mongoose=require("mongoose")

const jobschema=new mongoose.Schema({
    jobcatagoryname:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    } 
})
module.exports=mongoose.model("job_catagory_details",jobschema)