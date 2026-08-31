const mongoose = require("mongoose")
const {Schema} = mongoose
const validator = require("validator")
const jwt = require("jsonwebtoken")
const userSchema = new Schema({
    firstName : {
        type:String,
        required:true,
        minLength : 2,
        maxLength : 50
    },
    lastName :{
        type:String, 
        minLength : 2,
        maxLength : 50, 
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid email address" + value)
            }
        }
    },
     age :{
        type:Number,
        min : 18,
    
    },
    password :{
        type:String,
        required:true,
        minLength : 6,
        validate(value){
            if(!validator.isStrongPassword(value)){
             throw new Error("password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol")   
            }
        }
     
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value.toLowerCase())){
                throw new Error("Invalid gender data ")
        }
    }
    },
    photoURL :{
        type:String,
        default:"https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2205.jpg?semt=ais_hybrid&w=740&q=80"
    },
    skills : {
       type:  [String] ,
        validate(value) {
            if (value.length > 10) {
                throw new Error ("skills cannot be more than 10")
            }
        }
       
    },
    about :{
        type:String,
        maxLength : 500,
        default : "Hey there! I'm using DevTinder. Let's connect and share our coding journeys together!"

    }

},{
    timestamps:true
})

userSchema.methods.getJWT =  function () {
    user = this 
 const token = jwt.sign({_id : user._id} , "mysecretkey12345" , {
    expiresIn : "1d"
 })
return token
}
userSchema.index({firstName:1, lastName:1})

  const User = mongoose.model("User", userSchema)
 module.exports = User

 