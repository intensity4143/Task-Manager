import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { taskContext } from "../../App";
import { useForm } from "react-hook-form";

function Profile() {
  const { image, setImage } = useContext(taskContext);
  const [loading, setLoading] = useState(false);

  const { userName, setUserName, userEmail, setUserEmail } =
    useContext(taskContext);

  const [file, setFile] = useState(null);

  // server URL
  const url = "https://task-manager-backend-srzi.onrender.com";

  // const handleImageUpload = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const token = localStorage.getItem("token");

  //   if (!file) {
  //     toast.error("Please upload image to change profile picture");
  //     setLoading(false);
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("imageFile", file);

  //   try {
  //     const response = await axios.put(
  //       url + "/api/user/imageUpload",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log(response.data.message);
  //     setLoading(false);
  //     setImage(response.data.imageUrl);
  //     toast.success("Profile picture updated Successfully!");
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || error.message);
  //   }
  // };

  const handlePersonalInfo = async (data) => {
    const token = localStorage.getItem("token");
    console.log("updating")
    if (!token) {
      toast.error("User not authenticated. Please login.",{
        autoClose:1000,
      });
      return;
    }
    try {
      const response = await axios.put(url + "/api/user/updateProfile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Personal information updated !", {
        autoClose: 1000,
      }); // pop up displaying updated personal information

      setUserName(response.data.name);
      setUserEmail(response.data.email);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update profile.";

      toast.error(message, {
        autoClose: 1500,
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: userName,
      email: userEmail,
    },
  });

  return (
    <div>
      <h1 className="text-lg text-center">hey this is profile setting</h1>
      <div className="flex justify-center items-center gap-4 flex-wrap bg-amber-300">
        <div className="bg-gray-400 px-3 py-4 rounded-lg">
          <h1>Personal Information</h1>
         <form className="space-y-5" onSubmit={handleSubmit(handlePersonalInfo)}>
            {/* Name Field */}
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
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
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

            {/* Submit Button */}
            <input
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
              value={isSubmitting ? "Saving..." : "Save changes"}
              disabled={isSubmitting}
            />
          </form>
        </div>

       
      </div>

      {/* <form onSubmit={handleImageUpload}>
        <input
          type="file"
          name=""
          id=""
          capture="user"
          accept="image/*"
          className="bg-yellow-300"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          className="border rounded-md px-2 cursor-pointer"
          disabled={loading}
        >
          {loading ? "...uploading" : "Upload image"}
        </button>
      </form> */}
    </div>
  );
}

export default Profile;
