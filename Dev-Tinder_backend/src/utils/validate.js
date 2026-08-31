const validator = require("validator")

const validateSignUpData = (req) => {
    const {firstName,lastName , email , password} = req.body
    if (!firstName || !lastName){    
        throw new Error("both first name and last name are required")
    }
    else if (!email){
        throw new Error ("email is required")
    }
    else if(!validator.isEmail(email)){
    throw new Error("invalid email address")
    }
    else if (!password){
        throw new Error("password is required")
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol")
    }
   
} 

const validateUpdateData = (req) => {
    const user = req.user
    const data = req.body
    const allowedEditFields = ["firstName", "lastName" , "age" , "gender" , "about" , "skills", "photoURL" ]
    const isallowedEdit = Object.keys(data).every((key) => {
        return allowedEditFields.includes(key)
    })
    if(!isallowedEdit){
        throw new Error("Editing invalid feilds")
    }
    Object.keys(data).forEach((key) => {
        user[key] = data[key]
    })
    return user;
}
module.exports = {
    validateSignUpData,
    validateUpdateData
}