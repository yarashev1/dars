import {Router} from "express"
import userController from "../controller/users.controller.js"
import validation from "../middleware/validation.js"
import router from "./index.js"
const userRouter=Router()

userRouter
     .post("/api/register",validation.register,userController.register)
     .post("./api/login",validation.login,userController.login)

     .get("/api/users",userController.getAllUsers)


     export default userRouter