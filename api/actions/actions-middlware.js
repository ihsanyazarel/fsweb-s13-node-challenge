// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model");
const projectsModel = require("../projects/projects-model");

const actIdValidation = async (req,res,next)=>{
    try {
        const action = await actionsModel.get(req.params.id);
        action ? (req.action = action ,next()): res.status(404).json({message : "Belirtilen id'li action bulunamadı"});
    } catch (error) {
        next(error);
    }
}

const payloadValidation = async (req,res,next)=>{
    try {
        const {project_id, description, notes} = req.body;
        if(!project_id || !description || !notes){
            res.status(400).json({message: "project_id, description ve notes alanlarını eksiksiz giriniz"});
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const existProjectVld = async (req,res,next)=>{
    try {
        const {project_id} = req.body;
        const project = await projectsModel.get(project_id);
        project ? next() : res.status(404).json({message : "Belirtilen id'li proje bulunamadı"});
    } catch (error) {
        next(error);
    }
}


module.exports = {
    actIdValidation,
    payloadValidation,
    existProjectVld
};