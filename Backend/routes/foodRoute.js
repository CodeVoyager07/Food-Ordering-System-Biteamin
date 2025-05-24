import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";
import fs from "fs";

const foodRouter = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "food_images", // Cloudinary folder name
        format: async (req, file) => "jpeg", // Convert all images to JPEG
        public_id: (req, file) => Date.now() + "-" + file.originalname, // Unique file names
    },
});


// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//         const filename = Date.now() + "-" + file.originalname;
//         cb(null, filename);
//     },
// });

const upload = multer({ storage });


//Tested
foodRouter.post("/add", (req, res, next) => {
    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);
    next();
}, upload.single("image"), addFood);

//Tested
foodRouter.get("/list",listFood);


foodRouter.post("/remove",removeFood);

export default foodRouter;
