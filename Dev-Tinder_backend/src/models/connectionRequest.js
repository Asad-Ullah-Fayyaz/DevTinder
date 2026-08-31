const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const connectionRequestSchema = new Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
    ,
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum : {
            values : ["ignored", "interested" , "accepted" , "rejected"] ,
            message:"status is invalid" 
        }
    }
},
{
    timestamps:true
})

connectionRequestSchema.pre("save",function(){
   const connectionRequest = this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send request to your ow ID")
    }

})

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)
module.exports= ConnectionRequest