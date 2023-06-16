const projectsModel = require("./projects-model");
// projects ara yazılımları buraya
const idValidation = async (req,res,next)=>{
    try {
        const project = await projectsModel.get(req.params.id);
        project ? (req.project = project ,next()): res.status(404).json({message : "Belirtilen id'li proje bulunamadı"});
    } catch (error) {
        next(error);
    }
}

const nameAndDescriptionVld = async (req,res,next)=>{
    try {
        const {name, description} = req.body;
        if(!name || !description){
            res.status(400).json({message: "name ve description alanlarını eksiksiz giriniz"});
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    idValidation,
    nameAndDescriptionVld
};