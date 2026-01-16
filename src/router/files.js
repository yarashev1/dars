import {Router} from "express"
import userController from "../controller/users.controller.js"
import validation from "../middleware/validation.js"
import router from "./index.js"
import filesController from "../controller/files.controller.js"
const userRouter=Router()

userRouter
.post("/api/files",validation.files,filesController.createFile)

// console.log("3");

    //  .get("/api/files",userController.getAllUsers)


     export default userRouter