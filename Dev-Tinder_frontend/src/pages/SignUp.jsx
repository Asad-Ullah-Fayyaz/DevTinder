import { useForm } from "react-hook-form";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [error,setError] = useState("")
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:5000/signup",{
              firstName :  data.firstName,
              lastName :  data.lastName,
              email :  data.email,
              password :  data.password,  
            })
           
            navigate("/login")
            
        } catch (error) {
            setError(error?.response?.data)
        }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
          {error && (
  <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-xl transition-all duration-300">
    ❌ {error}
  </div>
)}

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters"
                }
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name (optional but min 2 if filled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register("lastName", {
                validate: (value) =>
                  value === "" || value.length >= 2 || "Minimum 2 characters"
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label>Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email"
                }
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters"
                }
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button className="w-full bg-gray-900 text-white py-2 rounded-lg">
            Sign Up
          </button>

        </form>
         <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-gray-900 font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;