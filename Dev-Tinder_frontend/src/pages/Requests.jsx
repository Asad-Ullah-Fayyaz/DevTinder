import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addRequest, removeRequest } from "../utils/requestSlice"
import { useEffect,useState } from "react"
import { BASE_URL } from "../utils/constants"
const Requests = ()=> {
    const requests = useSelector((store) => store.request)
    
    
    const [error , setError] = useState("")
    const dispatch = useDispatch()

    const reviewRequest = async (status,_id)=>{
        try {
             await axios.post(`${BASE_URL}/request/review/`+status+"/"+_id,{},{
                withCredentials:true
            })
            dispatch(removeRequest({_id:_id}))
        } catch (error) {
            setError(error.message)
        }
    }

    const getRequests = async ()=>{
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`,
                {withCredentials:true})
               dispatch(addRequest(res?.data?.data))
                  
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(()=>{
        
        getRequests()
    },[])
    return (
        
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Connection Requests
      </h1>

      {/* Error */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      {/* {if(!requests) return <h1>some thing went wrong</h1>} */}
      {/* No Connections */}
      {requests?.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No request found
        </div>
      )}

      {/* Connections List */}
 <div className="max-w-4xl mx-auto space-y-6">

  {requests?.map((request) => (

    <div
      key={request._id}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
    >

      {/* Left Section */}
      <div className="flex items-center gap-5">

        {/* Profile Image */}
        <img
          src={
            request?.fromUserId?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
        />

        {/* User Info */}
        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
          </h2>

          <p className="text-gray-500 mt-1">
            {request?.fromUserId?.age} years old
          </p>

          <p className="text-gray-600 mt-3 max-w-md">
            {request?.fromUserId?.about}
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex gap-4 sm:flex-col md:flex-row">

        <button
        onClick={()=>{reviewRequest("accepted",request._id)}}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl transition duration-300 shadow-md"
        >
          Accept
        </button>

        <button
        onClick={()=>{reviewRequest("rejected",request._id)}}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl transition duration-300 shadow-md"
        >
          Reject
        </button>

      </div>

    </div>

  ))}

</div>

    </div>
    )
}
export default Requests