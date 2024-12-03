const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,"NAME REQUIRE"] 
    },
    email:{
        type:String,
        require:[true,"EMAIL REQUIRE"] 
    },
    password:{
        type:String,
        require:[true,"PASSWORD REQUIRE"] 
    },
    role:{
        type:String,
        require:[true,"ROLE REQUIRE"],
        default:"user" 
    },
    status : {
        type : String,
        default : 1,
      }
})

module.exports=mongoose.model("register_data",userSchema)