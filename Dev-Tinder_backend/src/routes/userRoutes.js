const express = require("express")

const {userAuth} = require("../middlewares/auth")
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequest")



const userRouter = express.Router()
const neededData = ["firstName", "lastName", "gender", "age", "skills" , "about", "photoURL"]
   

userRouter.get("/user/requests/received",userAuth, async (req,res) => {

    try{
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName gender age skills about photoURL")
            res.json({
                message:"Received Requests : ",
                data:connectionRequests
            })
    }catch(err){
        res.status(500).json({
            message:"Error : "+ err
        })
    }
})
userRouter.get("/user/connections",userAuth , async(req,res) => {
     try {
        const loggedInUser = req.user
        const allConnections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id , status:"accepted"}
            ]
        }).populate("fromUserId", neededData).populate("toUserId",neededData)
        const data = allConnections.map((doc)=> {
     
        if(doc.fromUserId.equals(loggedInUser._id)){
            return{ 
                connectedUser: doc.toUserId ,
                connection_id : doc._id
            }
        }
        return { 
                connectedUser: doc.fromUserId ,
                connection_id : doc._id
            }
    })
        res.json({
           data
        })
    } catch (error) {
        res.status(404).json({
            message:"Error : some thing happen "
        })
    }
})
userRouter.delete("/user/connection/:_id",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user 
        const connection_id = req.params._id
        const data = await ConnectionRequest.findOneAndDelete({
             _id:connection_id , 
             status:"accepted",
             $or:[
                {toUserId:loggedInUser._id,  },
                {fromUserId:loggedInUser._id,}
             ]
            })
        if(!data){
            return res.json({
                message:"Error",
                data
            })
        }
             
             
            res.json({
                message:"connection deleted successfully",
                data

            })


        
    } catch (error) {
        res.status(500).json({
            message:"Error : " + error.message
        })
    }
})

userRouter.get("/feed",userAuth, async(req,res)=>{
   let limit = req.query.limit || 10
   limit=limit>50?50:limit
   let page= req.query.page || 1
  const skip = (page-1)*limit
   
    try {
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId")
        const hideFromFeed = new Set()
        connectionRequests.forEach((req)=>{
            
            hideFromFeed.add(req.fromUserId.toString())
            hideFromFeed.add(req.toUserId.toString())
            
        })
        
        const users = await User.find({
            $and:[
           { _id:{$nin:Array.from(hideFromFeed)}},
           { _id:{$ne:loggedInUser._id}}
            ]
        }).select(neededData).skip(skip).limit(limit)
        
        res.send(users)
    } catch (error) {
        res.status(400).json({
            messsage:"Error : " + error
        })
    }
})
// userRouter.get("/feed",userAuth,async(req,res)=>{
//     const neededData = ["firstName", "lastName", "gender", "age", "skills" , "about", "photoURL"]
//     try {
//         const loggedInUser = req.user
//         const connections = await ConnectionRequest.find({
//             $or:[
//                 {fromUserId:loggedInUser._id},
//                 {toUserId:loggedInUser._id},
                
//             ]
//         }).populate("fromUserId",neededData).populate("toUserId",neededData)
//         const data = connections.map((doc)=>{
//             if(doc.fromUserId.equals(loggedInUser._id)){
//                 return doc.toUserId
//             }
//             return doc.fromUserId
            
//         })

//         const users =await User.find({})
        
//         const feed = users.filter((user)=>{
//             if( (user._id.toString()!==loggedInUser._id.toString()) 
//                 &&
//              (data.every((doc)=> doc._id.toString() !== user._id.toString()))
//             )
//                 {
//                 return user
//             }
//         }) 
//         res.send(feed)
//     } catch (error) {
//         res.status(400).json({
//             message :"Error : " + error
//         })
//     }
// })
module.exports= userRouter