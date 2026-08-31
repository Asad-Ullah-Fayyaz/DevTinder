const express = require("express")
const {userAuth} = require("../middlewares/auth")
const  User  = require("../models/user")
const { validateUpdateData } = require("../utils/validate")
const bcrypt = require("bcrypt")

const profileRoutes  =  express.Router()



profileRoutes.patch("/profile/edit",userAuth,async(req,res)=>{
try {
    const user = validateUpdateData(req)
  await user.save()
    // const updatedUser= await User.findByIdAndUpdate(user._id, user,{
    //     runValidators:true,
    //     returnDocument:"after"
    // })
   res.send( user )
} catch (error) {
    res.status(500).send("ERROR : " + error.message)
}
})
profileRoutes.get("/profile/view" , userAuth, async (req,res) => {
   try{
    const user = req.user
    res.send(user)
} catch (error) {
    res.status(500).send("ERROR : " + error.message)
}
})
profileRoutes.patch("/profile/password",userAuth, async (req,res) => {
    try{
        const user = req.user
         const hashedPassword = user.password
         const oldPassword = req.body.oldPassword
       
         const isPasswordCorrect = await bcrypt.compare(oldPassword,hashedPassword)
         if(!isPasswordCorrect){
            throw new Error("current password is not correct")
         }
        const newHashedPassword = await bcrypt.hash(req.body.newPassword,10)
        const updatedPassword = { password : newHashedPassword }
          const userWithUpdatedPassword = await User.findByIdAndUpdate(req.user._id, updatedPassword,{
            runValidators: true,
            returnDocument:"after"
          })
          res.json({
            "message":"Password Updated Successfully",
            "Data": userWithUpdatedPassword
         })
       }catch(err){
        res.status(500).send("ERROR : " + err.message)
    }
})
module.exports = profileRoutes