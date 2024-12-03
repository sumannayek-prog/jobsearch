const mongoose=require("mongoose")

const banner=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    subtitle:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:1
    }
})

module.exports=mongoose.model("adminbanner",banner)