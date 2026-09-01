import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
const UserCard = ({ user }) => {
  const [error,setError] = useState("")
  const dispatch = useDispatch()
  const handleFeed = async (status,_id) => {
    try {
      await axios.post(`${BASE_URL}/request/send/`+status+"/"+_id,{},{
        withCredentials:true
      })
      dispatch(removeFeed(_id))
      
    } catch (error) {
      setError(error.message)
    }
  }

  if (!user) return;
  
  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    photoURL,
    skills,
    _id
  } = user;

  return (

    <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
       {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      {/* Image Section */}
      <div className="relative h-[300px] w-full overflow-hidden">

        <img
          src={photoURL}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

        {/* User Info on Image */}
        <div className="absolute bottom-0 left-0 p-5 text-white w-full">

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold tracking-wide">
              {firstName} {lastName}
            </h2>

            {age && (
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                {age} yrs
              </span>
            )}

          </div>

          {gender && (
            <p className="capitalize text-sm text-gray-200 mt-1">
              {gender}
            </p>
          )}

        </div>

      </div>

      {/* Content */}
      <div className="p-5">

        {/* About */}
        <div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            About
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            {about || "No bio available"}
          </p>

        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mt-5">

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">

          <button onClick={()=>handleFeed("ignored",_id)}
            className="flex-1 py-3 rounded-2xl bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-all duration-300"
          >
            Ignore
          </button>

          <button onClick={()=>handleFeed("interested",_id)}
            className="flex-1 py-3 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-black transition-all duration-300"
          >
            Interested
          </button>

        </div>

      </div>

    </div>
  );
};

export default UserCard;