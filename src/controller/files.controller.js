import filesService from "../services/files.service.js"

class fileController{

    async createFile(req,res,next){
        try {
            console.log(req);
            const data = await filesService.createFile(req.body, req.files)
            
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }
}

export default new  fileController()