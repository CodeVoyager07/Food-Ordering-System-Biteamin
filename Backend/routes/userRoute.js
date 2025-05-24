import express from "express"
import {loginUser,registerUser} from "../controllers/userController.js"

const userRouter = express.Router();

//API Tested
userRouter.post("/register",registerUser);

//API Tested
userRouter.post("/login",loginUser);







export default userRouter;