import Order from "../models/orderModel.js";

export const submitOrder = async (req, res) => {
    try {
        const { customerDetails, items: rawItems, amount } = req.body;
        
        // Ensure each item has an image URL
        const items = rawItems.map(item => ({
            ...item,
            image: item.image || '/images/default-food.png'
        }));

        // Validate order data
        if (!customerDetails || !amount) {
            return res.status(400).json({ success: false, message: "Invalid order data" });
        }

        // Create a new order instance
        const newOrder = new Order({
            customerDetails,
            items,
            amount,
            userId: req.user.id,
            createdAt: new Date(),
        });

        // Save the order to the database
        await newOrder.save();

        res.status(201).json({ success: true, message: "Order submitted successfully", order: newOrder });
    } catch (error) {
        console.error("Error submitting order:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};


export const getallOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};
