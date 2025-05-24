import Order from "../models/orderModel.js"; // Assuming an Order model exists

export const submitOrder = async (req, res) => {
    try {
        const { customerDetails, amount } = req.body;

        // Validate order data
        if (!customerDetails || !amount) {
            return res.status(400).json({ success: false, message: "Invalid order data" });
        }

        // Create a new order instance
        const newOrder = new Order({
            customerDetails,
            amount,
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
