const mongoose=require("mongoose")

const marchentSchema= new mongoose.Schema({
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
        default:"marchent" 
    },
    isMarchent:{
        type:Boolean,
        default:true
      },
    status : {
        type : String,
        default : 1,
      }
})

module.exports=mongoose.model("marchent_data",marchentSchema)