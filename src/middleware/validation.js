import { BadrequestError,InternalServerError } from "../utils/error.js";
import validations  from "../validation/validations.js";
class UserMiddleware{ 
    register=(req,res,next)=>{
        try{
            const {error}=validations.registerSchema.validate (req.body)
        if(error){
          next(new BadrequestError(400,error.details[0].message))
        }
        next();
        }catch (error){
          throw  next( new InternalServerError(500,error.message))
        }
        
    };

    login=(req,res,next)=>{
        try{
            const {error}=validations.loginSchema.validate (req.body)
        if(error){
           throw(new BadrequestError(400,error.details[0].message))
        }
        next();
        }catch (error){
           next( error)
        
    }
};

 files=(req,res,next)=>{
     console.log("error");
        try{
            const {error}=validations.fileSchema.validate(req.body)
            
        if(error){
           throw(new BadrequestError(400,error.details[0].message))
        }
        next();
        }catch (error){
            console.log(error);
            
           next( error)
        
    };
}
}
export default new UserMiddleware()