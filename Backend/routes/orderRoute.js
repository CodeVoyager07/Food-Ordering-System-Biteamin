import express from "express";
import { submitOrder, getOrders,getallOrders} from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js";

const orderRouter = express.Router();

// Route to handle order submission
orderRouter.post("/submitOrder", authMiddleware, submitOrder);
orderRouter.get("/list",authMiddleware, getOrders);
orderRouter.get("/all", getallOrders);


export default orderRouter;
