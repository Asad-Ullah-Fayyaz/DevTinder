const mongoose  = require("mongoose")

const connection = async () => {
 await mongoose.connect(
  "mongodb+srv://db_user:user1234@node.sxnjopb.mongodb.net/devTinder?appName=node"
)
}

module.exports =  connection              

