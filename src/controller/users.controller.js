import userServices from "../services/user.services.js";
class UserController{

    async register(req,res,next){
        try{
          const data =await userServices.register(req.body,req.files,next)
         if(data){
            console.log(data);
            
            return res.status(data.status).json(data)
     };

        }catch (error){
         next(error)
        }
   }

   async login(req,res,next){
      try{
         const data=await userServices.login(req.body,next)
         if (data){
            return res.status(data.status).json(data);
         }
      }catch(error){
         next(error)
      }
   }
   async getAllUsers (req,res,next){
      try {
         const data=await userServices.getallUsers()
         if(!data.length){
            return  res.status(200).json({
               status:200,
               message:"users empty"
            })
         }
         return res.status(200).json({
            status:200,
            data
         })
      } catch (error) {
         next(error)
         
      }
   }
}

export default new UserController()