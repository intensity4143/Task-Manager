const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect = () => {
    console.log(" cloudinary key :-  " + process.env.API_KEY)
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log("unable to connect with cloudinary");
    console.error(error.message);
    process.exit(1);
  }
};

