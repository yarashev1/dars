import userServices from "../services/user.services.js";
class UserController{

    async register(req,res){
         const data =await userServices.register(req.body,req.files)
         return res.send(data)
    }


}

export default new UserController()