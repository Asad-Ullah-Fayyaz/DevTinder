import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addConnection,removeConnection } from "../utils/conenctionSlice";

const Connections = () => {

    
  const connections = useSelector((store) => store.connection);

  
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const deleteConnection = async (connection_id) => {
    try {
      
    
       await axios.delete("http://localhost:5000/user/connection/"+connection_id,{
            withCredentials:true
        })
  
        
        dispatch(removeConnection(connection_id))
     
        
    } catch (error) {
        setError(error.message)
    }
  }

  const getConnections = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/user/connections",
        {
          withCredentials: true,
        }
      );

      dispatch(addConnection(res?.data?.data));

    } catch (error) {

      setError(error.message);

    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Your Connections
      </h1>

      {/* Error */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* No Connections */}
      {connections?.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No connections found
        </div>
      )}

      {/* Connections List */}
      <div className="max-w-4xl mx-auto space-y-5">

        {connections?.map((connection) => (

          <div
            key={connection?.connectedUser?._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex items-center justify-between"
          >

            {/* Left Section */}
            <div className="flex items-center gap-5">

             <div className="relative">

  {/* Online Status Dot */}
  <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute top-1 right-1 z-10"></div>

  {/* Profile Image */}
  <img
    src={
      connection?.connectedUser?.photoURL ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
    alt="profile"
    className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
  />

</div>

              {/* User Info */}
              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  {connection?.connectedUser?.firstName} {connection?.connectedUser?.lastName}
                </h2>

                <p className="text-gray-500 mt-1">
                  {connection?.connectedUser?.age} years old
                </p>

                <p className="text-gray-600 mt-2 line-clamp-2">
                  {connection?.connectedUser?.about}
                </p>

              </div>

            </div>

            {/* Right Section */}
            <div className="hidden sm:flex flex-col items-center">

              
              

              <button
                 className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-sm"
                 onClick={()=>{deleteConnection(connection?.connection_id)}}>
                 Disconnect
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Connections;