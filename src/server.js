import { config } from "dotenv"
import express from "express"
import fileUpload from "express-fileupload"
import indexRouter from "./router/index.js"
import fs from "fs"
import { join } from "path"
config()


const app = express()
app.use(express.json())
app.use(fileUpload())
app.use(indexRouter.userRouter)
app.use(indexRouter.fileRouter)

app.use((error, req, res, next) => {
    
    if (error.status || error.status < 500) {
        return res.status(error.status).json({
            ststus: error.status,
            massage: error.massage,
            name: error.name
        })
    } else {
        let errorText = `\n\n[${new Date()}]--${req.method}--${req.url}--${error.stack}`
        fs.appendFileSync(join(process.cwd(), 'src', 'logs', 'logger.txt'), errorText)

        res.status(500).json({
            status: 500,
            massage: "InternalServrError",
            name: error.name


        })
    }

})

app.listen(process.env.PORT || 3000, () => console.log("server is running"))





