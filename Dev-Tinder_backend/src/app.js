const express = require("express")
const connection = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(cors({
  
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials:true
}));

    


app.use(express.json())
app.use(cookieParser())

// Routes (clean structure)
const authRoutes = require("./routes/authRoutes")
const profileRoutes = require("./routes/profileRoutes")
const requestRoutes = require("./routes/requestRoutes")
const userRoutes = require("./routes/userRoutes")

app.use("/", authRoutes)
app.use("/", profileRoutes)
app.use("/", requestRoutes)
app.use("/", userRoutes)

connection()
  .then(() => {
    console.log("Connected to database successfully...")
    app.listen(5000, () => {
      console.log("Server is running on port 5000")
    })
  })
  .catch((error) => {
    console.error("Error connecting to database:", error)
  })