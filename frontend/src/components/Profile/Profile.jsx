import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { taskContext } from "../../App";

function Profile() {
  const {image, setImage} = useContext(taskContext);
  const [loading, setLoading] =useState(false)

  const [file, setFile] = useState(null);
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    setLoading(true)
    const token = localStorage.getItem("token")
    
    if (!file){
      toast.error("Please upload image to change profile picture");
      setLoading(false); 
      return
    }
    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const response = await axios.put(
        "http://127.0.0.1:3000/api/user/imageUpload",
        formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
      setLoading(false);
      setImage(response.data.imageUrl)
      toast.success("Profile picture updated Successfully!")

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
        <button type="submit" className="border rounded-md px-2 cursor-pointer"
        disabled = {loading}
        >
          {loading ? "...uploading" : "Upload image"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
