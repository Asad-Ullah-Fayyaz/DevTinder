const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req,res,next) => {
 try{
    const cookie = req.cookies       
        const {token} = cookie

 const isTokenValid = jwt.verify(token, "mysecretkey12345")

 const {_id} = isTokenValid
 const user = await User.findById(_id)
 if(user === null){ 
    return res.status(404).send("please login")     
 }
    req.user = user 
    next() 
    } catch (error) {
        res.status(401).send("main hi wo error hun     : " + error.message)
    }
}

module.exports = {
    userAuth
}