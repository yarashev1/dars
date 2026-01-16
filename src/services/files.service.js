class Fileservice{
    async createFile(body,files){
        const {file}=files
        console.log(file);
        
    }
}

export default new Fileservice()