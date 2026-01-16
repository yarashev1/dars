import pool from "../database/config.js"
import { extname, join } from "path"
import { comparePassword, hashPassword } from "../utils/bcrypt.js"
import JWT from "jsonwebtoken"
import { config } from "dotenv"
import { ConflictError, InternalServerError, NotFoundError } from "../utils/error.js"

class UserService {
    async register(body, files, next) {
        const { username, password } = body
        const { file } = files;

        const fileName = new Date().getTime() + extname(file.name)
        console.log(fileName)
        const existUser = await pool.query("select * from users where username=$1", [username]);
        if (existUser.rowCount) {
            throw new ConflictError(409, "user already exist")
        }

        const newUser =  await pool.query("insert into users(username,password,avatar) values($1,$2,$3) RETURNING*",
            [username, await hashPassword(password), fileName]
        );
        await file.mv(join(process.cwd(), "src", "uploads", fileName), (err) => {
            if (err) {
                throw new InternalServerError(500, err)
            }
        });

        return {
            status: 201,
            message: "user success created",
            accessToken: JWT.sign(
                { id: newUser.rows[0].id, username: newUser.rows[0].username }, 
                process.env.JWT_SECRET, 
                { expiresIn: "1m" }
            ),
            refreshToken: JWT.sign(
                { id: newUser.rows[0].id, username: newUser.rows[0].username },
                 process.env.JWT_SECRET,
                  { expiresIn: "1m" }
                ),
        }; 
 
    }

    async login(body,next){
        const {username,password}=body;
         const existUser = await pool.query("select * from users where username=$1", [username]);
        if (!existUser.rowCount) {
            throw new NotFoundError (409, "user or password wrong");
        }
        if(!(await comparePassword(password,existUser.rows[0].password))){
            throw new NotFoundError (409, "user or password wrong"); 
        }
         return {
            status: 200,
            message: "user success created",
            accessToken: JWT.sign(
                { id: existUser.rows[0].id, username: existUser.rows[0].username }, 
                process.env.JWT_SECRET, 
                { expiresIn: "1m" }
            ),
            refreshToken: JWT.sign(
                { id: newUser.rows[0].id, username: existUser.rows[0].username },
                 process.env.JWT_SECRET,
                  { expiresIn: "1m" }
                ),
        }; 

    }

    async getallUsers(){
const users = await pool.query("select id,username, avatar  from users")
return users.rows
    }
}

export default new UserService()