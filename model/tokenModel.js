const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    _userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'register_data',
    },
    token:{
        type:String,
        required:true
    },
    expiredAt:{
        type:Date,
        default:Date.now,
        index:{
            expires:86400000
        }
    }
})

module.exports= new mongoose.model("token",tokenSchema);
