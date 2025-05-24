import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import dotenv from "dotenv"; 
import orderRouter from "./routes/orderRoute.js"; // Import the order route
import axios from "axios";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 

// Connect to MongoDB
connectDB();

// Serve static files
app.use("/images", express.static("uploads"));

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root Route
app.get("/", (req, res) => {
    res.send("API working");
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server started at port: ${port}`);
});
