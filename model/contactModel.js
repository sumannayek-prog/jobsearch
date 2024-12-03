const mongoose=require("mongoose")

const contact=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    sub:{
        type:String,
        require:true
    },
    sms:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("contact",contact)