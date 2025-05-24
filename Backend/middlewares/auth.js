import jwt from "jsonwebtoken";

const authMiddleware = async(req,res,next)=>{
   const token = req.headers.authorization?.split(' ')[1];
   if (!token) {
      return res.status(401).json({
         success: false,
         message: "Authorization token required. Please login again."
      });
   }
   try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user = { id: token_decode.id };
    next();
   } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({
         success: false,
         message: "Invalid or expired token. Please login again."
      });
   }
}




export default authMiddleware;