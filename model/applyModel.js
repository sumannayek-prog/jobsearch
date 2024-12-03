const mongoose=require("mongoose")

const applyschema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    sms:{
        type:String,
        required:true
    },
    job_title: {
        type: String,
        required: true
    },
    location:{
        type:String,
        required:true
    },
    job_company: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    appliedAt:{
        type:Date,
        default:Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
})

module.exports=mongoose.model("apply_data",applyschema)