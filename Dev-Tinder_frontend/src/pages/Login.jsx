import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const [email,setEmail] = useState("")
      const [error,setError] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = async () => {
        try {
           const res= await axios.post(`${BASE_URL}/login`,{
                email,password
            },{
                withCredentials:true
            })
            dispatch(addUser(res.data))
            navigate("/")
        } catch (error) {
            setError(error.response?.data )
        }
    }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {error && (
  <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-xl transition-all duration-300">
    ❌ {error}
  </div>
)}
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to your account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Welcome back! Please enter your details.
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              value={email}
              type="email"
              placeholder="Enter your email"
              onChange={(e)=>{setEmail(e.target.value)}}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e)=>{setPassword(e.target.value)}}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Button */}
          <button
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
         onClick={handleClick} >
            Sign In
          </button>

        </div>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
         <Link to={"/signup"}> <span className="text-gray-900 font-medium cursor-pointer hover:underline">
            Sign up
          </span>
          </Link>
        </p>

      </div>

    </div>
  );
};


export default Login