import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async(req,res)=>{
  try {
    let userData = await userModel.findOne({_id:req.user.id});
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId]=1;
    }else{
      cartData[req.body.itemId]+=1;
    }
    await userModel.findByIdAndUpdate(req.user.id,{cartData});
    res.json({success:true,message:"Added To Cart"})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error occured"})
  }
}

// Remove items from user cart
const removeFromCart = async(req,res)=>{
  try {
    let userData = await userModel.findOne({_id:req.user.id});
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId]>0) {
      cartData[req.body.itemId]-=1;
    }
    await userModel.findByIdAndUpdate(req.user.id,{cartData});
    res.json({success:true,message:"Removed From Cart"})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error occured"})
  }
}

// Get items from cart
const getCart = async(req,res)=>{
  try {
    let userData = await userModel.findOne({_id:req.user.id});
    if (!userData) {
      return res.status(404).json({success:false,message:"User not found"});
    }
    let cartData = userData.cartData || {};
    res.json({success:true,cartData})

  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Error occurred"})
  }
}

// Submit Order
const submitOrder = async (req, res) => {
  try {
    const { userId, course, section, year } = req.body;
    let userData = await userModel.findOne({_id: userId});
    
    // Assuming we have an orders array in the user model to store orders
    userData.orders.push({ course, section, year });
    await userModel.findByIdAndUpdate(userId, { orders: userData.orders });
    
    res.json({ success: true, message: "Order submitted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while submitting order" });
  }
}

export { addToCart, removeFromCart, getCart }
