import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        course: { type: String, required: true },
        section: { type: String, required: true },
        year: { type: String, required: true },
    },
    items: [{
        foodId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true }
    }],
    amount: { type: Number, required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

export default Order;
