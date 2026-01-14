import {Router} from "express"
import userController from "../controller/users.controller.js"
import validations from "../middleware/validation.js"
const userRouter=Router()

userRouter
     .post("/api/register",validations.register,userController.register)
     // .post("./api/login",validation,userController,login)

     // .get("./api/users",userController,getAllUsers)


     export default userRouter