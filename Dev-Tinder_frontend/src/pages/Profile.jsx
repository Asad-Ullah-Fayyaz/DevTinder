import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
 const dispatch = useDispatch()
 const updateProfile = async ()=>{
 
    try {
        const res = await axios.patch(`${BASE_URL}/profile/edit',
            {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoURL,
                skills

            },
               {
                withCredentials:true
            }
            
        )
        dispatch(addUser(res?.data))
        setSuccess(true)
        setError("")
        setTimeout(()=>{
          setSuccess(false)
        },4000)
    } catch (error) {
        setError(error?.response?.data)
    }
   }
   

    const user = useSelector((store) => store.user)
     const [firstName,setFirstName] = useState(user?.firstName || " ")
    const [lastName,setLastName] = useState(user?.lastName || " ")
    const [age,setAge] = useState(user?.age || " ")
    const [gender,setGender] = useState(user?.gender || " ")
    const [about,setAbout] = useState(user?.about || " ")
    const [photoURL,setPhotoURL] = useState(user?.photoURL || " ")
    const [skills,setSkills] = useState(user?.skills || [])
    const [error,setError] = useState("")
    const [success , setSuccess] = useState(false)

    useEffect(()=> {
    if(user){
      setFirstName(user.firstName || "")
      setLastName(user.lastName || "")
      setAge(user.age || "")
      setGender(user.gender || "")
      setAbout(user.about || "")
      setPhotoURL(user.photoURL || "")
      setSkills(user.skills || [])
    }
    },[user])
      

 return (
  <>
    {user && (
      <div className="min-h-screen bg-gray-100 px-6 py-10">

        {/* Top Messages */}
        <div className="max-w-6xl mx-auto mb-6">

        {error && (
  <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-xl transition-all duration-300">
    ❌ {error}
  </div>
)}

{success && (
  <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-xl transition-all duration-300">
    ✅ Profile updated successfully
  </div>
)}

        </div>

        {/* Main Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Form Card */}
          <div className="bg-white shadow-2xl rounded-3xl p-10 h-full">

            {/* Heading */}
            <div className="mb-8 text-center">

              <h1 className="text-3xl font-bold text-gray-800">
                Edit Profile
              </h1>

              <p className="text-gray-500 mt-2">
                Update your personal information
              </p>

            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mt-4 mb-2">
                First Name
              </label>

              <input
                value={firstName}
                type="text"
                placeholder="Enter first name"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mt-4 mb-2">
                Last Name
              </label>

              <input
                value={lastName}
                type="text"
                placeholder="Enter last name"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mt-4 mb-2">
                Age
              </label>

              <input
                value={age}
                type="number"
                placeholder="Enter age"
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mt-4 mb-2">
                Gender
              </label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mt-4 mb-2">
                About
              </label>

              <textarea
                value={about}
                rows="4"
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell something about yourself"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none"
              ></textarea>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mt-4 mb-2">
                Photo URL
              </label>

              <input
                value={photoURL}
                type="text"
                placeholder="Paste your image URL"
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mt-4 mb-2">
                Skills
              </label>

              <input
                value={skills.join(" ")}
                type="text"
                placeholder="e.g React Node MongoDB"
                onChange={(e) =>
                  setSkills(
                    e.target.value
                      .split(" ")
                      .map((skill) => skill.trim())
                  )
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Button */}
            <button
              onClick={updateProfile}
              type="button"
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition duration-300 mt-8"
            >
              Save Profile
            </button>

          </div>

          {/* Preview Card */}
          <div className="h-full flex">

            <div className="w-full bg-grey-900 shadow-2xl rounded-3xl p-6 flex justify-center items-start">

              <UserCard
                user={{
                  firstName,
                  lastName,
                  age,
                  gender,
                  about,
                  photoURL,
                  skills,
                }}
              />

            </div>

          </div>

        </div>
      </div>
    )}
  </>
);
    
};

export default Profile;