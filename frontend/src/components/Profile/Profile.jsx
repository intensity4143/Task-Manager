import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Profile() {
  const [file, setFile] = useState(null);
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    
    if (!file)
      return toast.error("Please upload image to change profile picture");

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/user/imageUpload",
        formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
      localStorage.setItem("image",response.data)
    } catch (error) {
      toast.error(error?.response?.data?.message ||error.message);
    }
  };

  return (
    <div>
      <h1>hey this is profile setting</h1>
      <form onSubmit={handleImageUpload}>
        <input
          type="file"
          name=""
          id=""
          capture="user"
          accept="image/*"
          className="bg-yellow-300"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="border rounded-md px-2 cursor-pointer">
          upload image
        </button>
      </form>
    </div>
  );
}

export default Profile;
