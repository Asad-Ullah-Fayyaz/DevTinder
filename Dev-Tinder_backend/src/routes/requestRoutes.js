const express = require("express")
const {userAuth} = require("../middlewares/auth")
const requestRoutes = express.Router()
 const ConnectionRequest = require("../models/connectionRequest")
 const User = require("../models/user")
requestRoutes.post("/request/send/:status/:userId",userAuth , async (req,res)=>{
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.userId
        const status = req.params.status
        
        const allowedStatus = ["interested", "ignored"]
        if (!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"invalid status : " + status,
            })
        }
        const toUser = await User.findById(toUserId) 
        if(!toUser){
            throw new Error("invalid User")
        }
        const isConnectionRequestExist = await ConnectionRequest.findOne({  
            $or:
            [
                 {fromUserId:fromUserId,toUserId:toUserId},
                 {fromUserId:toUserId , toUserId:fromUserId}
            ]}
           )
        if(isConnectionRequestExist){
            throw new Error("Request already send")
        } 
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId, 
            status
        })
       const data = await connectionRequest.save()

        res.json({
            message : "request send successfully",
            data
        })
    }catch(error){
        
        res.status(500).send("Error : " + error.message)
    
    }
})
requestRoutes.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
try{
    const loggedInUser = req.user
    const{status,requestId}= req.params
    const isAllowedStatus = ["accepted","rejected"]
    if(!isAllowedStatus.includes(status)){
        throw new Error("status is not valid")
    }
    const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested"
    })
    if(!connectionRequest){
        throw new Error("request cannot be found")
    }
    connectionRequest.status = status
    const data = await connectionRequest.save()
    res.json({
        message:`connection request ${status} successfully`,
        data
    })

}catch(err){
    res.status(500).json({
        message:"Error : " + err
    })
}
})
module.exports = requestRoutes