import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import axios from 'axios';

const SignUp = () => {
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

    const handleSignUp = async (data) => {

        try {
            const response = await axios.post("http://localhost:3000/api/user/signUp",data);
            alert("signUp successfull !");
            console.log("user data:- ", response.data)
            navigate('/Home')
        } catch (error) {
            alert("Error while creating account !")
            console.log(error.response.data || error.message)
        }
   }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="space-y-3"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Name :
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.Name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.Name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Name.message}
              </p>
            )}
          </div>
          {/* Email Field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
            value={isSubmitting? "Submitting": "Sign Up"}
          />
            {/* Sign Up */}
          {/* </input> */}
          <h1 className="text-center text-lg text-gray-600 mt-1">
            Already have an account?{" "}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold underline transition-colors duration-200 ${
                  isActive
                    ? "text-red-500"
                    : "text-blue-600 hover:text-blue-800"
                }`
              }
            >
              Login here
            </NavLink>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
