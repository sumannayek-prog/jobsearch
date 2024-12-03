const mongoose=require("mongoose")

const blog=mongoose.Schema({
    aboutblog:{
        type:String,
        require:true
    },
    blogername:{
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

module.exports=mongoose.model("adminblog",blog)