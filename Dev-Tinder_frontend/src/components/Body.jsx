import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
const Body = () => {
    const user = useSelector((store)=>store.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fetchData = async () => {
        try {
            
            if(user) return
            
            const res = await axios.get("http://localhost:5000/profile/view",{
                withCredentials : true
            })
             dispatch(addUser(res.data))
            
        } catch (error) {
             if(error.response.status === 401){
             navigate("/login")
            }
           console.error(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
    
     return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};
                


export default Body