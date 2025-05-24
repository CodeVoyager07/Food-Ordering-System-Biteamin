import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";
export const addFood = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const { name, description, price, category, image } = req.body;

    
        if (!name || !description || !price || !category || !image) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }
        const food = new foodModel({
            name,
            description,
            price,
            category,
            image // ✅ Store Cloudinary URL directly
        });

        await food.save();
        res.json({ success: true, message: "Food Added", imageUrl: image });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Error fetching food items" });
    }
};

export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        console.log("Food Image URL from DB:", food.image);

        // ✅ Extract Cloudinary public ID from the URL
        const publicId = food.image.split("/").pop().split(".")[0];

        // ✅ Delete Image from Cloudinary
        await cloudinary.v2.uploader.destroy(publicId);

        // ✅ Remove food item from DB
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
};