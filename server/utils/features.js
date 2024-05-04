import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid"; //function to generate uuids (unique ids)
import { v2 as cloudinary } from "cloudinary"; // for uploading files 
import { getBase64, getSockets } from "../lib/helper.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,   // 15 days cookie expiry age 
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

// Connects to the MongoDB database using the provided URI
const connectDB = (uri) => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "test" })
    .then(() => console.log(`Connected to DB: ${mongoose.connection.host}`))
    .catch((err) => {
      console.error('Error connecting to database:', err.message);
    });
};

const sendToken = (res, user, code, message) => {
  // Generates a JWT token containing the user's ID
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // Sets the token as a cookie in the response
  return res.status(code).cookie("my-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

// Emits a socket event to specified users
const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);   // Sends the event and data to the specified user sockets
};

// Uploads files to Cloudinary asynchronously
const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file), // Converts files to base64 format using a helper function
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

const deletFilesFromCloudinary = async (public_ids) => {
  // try {
  //   // Delete files from Cloudinary
  //   const deletionResult = await cloudinary.api.delete_resources(public_ids);
    
  //   // Check if deletion was successful
  //   if (deletionResult && deletionResult.deleted) {
  //     console.log("Files deleted from Cloudinary:", deletionResult.deleted);
  //   } else {
  //     console.log("No files deleted from Cloudinary");
  //   }
  // } catch (error) {
  //   console.error("Error deleting files from Cloudinary:", error);
  //   throw new Error("Error deleting files from Cloudinary");
  // }
};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deletFilesFromCloudinary,
  uploadFilesToCloudinary,
};
