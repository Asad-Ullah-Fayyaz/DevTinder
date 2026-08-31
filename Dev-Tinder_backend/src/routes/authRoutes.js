const express = require("express")
const User = require("../models/user")
const {validateSignUpData} = require("../utils/validate")
const bcrypt = require("bcrypt")


const authRoutes = express.Router()

authRoutes.post("/login" , async (req,res) => {
      try{
        const {email , password} = req.body
        if(!email || !password){
            return  res.status(400).send("email and password are required")
        }
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).send("invalid credentials")
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(404).send("invalid credentials")
        }
        const token = user.getJWT()
        
       res.cookie("token", token ,{
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
       })
        res.send(user)
      }catch (error) {
        res.status(500).send("something went wrong" + error.message)
      }
})

authRoutes.post("/signup", async (req,res) => {
   const {firstName,lastName,email,password} = req.body
    
    try {
        console.log("validateSignUpData(req) ke uppar");
   validateSignUpData(req)
   console.log("hased password k upar ");
   const hashedPassword = await bcrypt.hash(password,10) 
         console.log(" new user k upar");
    const user = new User({
        firstName,
        lastName,
        email,
        password : hashedPassword
    })
   console.log(" new user k neecahy");
   
   await user.save()
    res.send("User signed up successfully")
} catch (err) { 
    res.status(400).send("ERROR : " + err.message)
}
})

authRoutes.post("/logout",(req,res)=>{
    try{
        res.cookie("token",null , {
            expires:new Date(Date.now())
        })
        res.send("user logged out successfully")
    }catch(err){
        res.status(500).send("ERROR : " + err.message)
    }
})


module.exports = authRoutes