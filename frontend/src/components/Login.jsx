import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { taskContext } from "../App";

function Login(props) {
  const navigate = useNavigate();
  // server url
  const url = https://task-manager-backend-srzi.onrender.com

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        url+"/api/user/login",
        data
      ); 
      // send user login credentials to server
      
      localStorage.setItem("token", response.data.token); // set token in local storage for authorization
      toast.success("Login successfull !"); // pop up
      console.log(response.data);
      navigate("/layout/allTasks"); // navigate to Home or Dashboard
    } 
    catch (error) {
      toast.error("Error while Login !");
      console.log(error.response.data || error.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
            value={isSubmitting ? "Logging In" : "Log In"}
          />

          <h1 className="text-center text-lg text-gray-600 mt-1">
            Don’t have an account?{" "}
            <NavLink
              to="/SignUp"
              className={({ isActive }) =>
                `font-semibold underline transition-colors duration-200 ${
                  isActive
                    ? "text-red-500"
                    : "text-blue-600 hover:text-blue-800"
                }`
              }
            >
              Sign in here
            </NavLink>
          </h1>
        </form>
      </div>
    </div>
  );
}

export default Login;
