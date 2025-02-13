// "project" routerını buraya yazın!
const router = require("express").Router();
const projectsModel = require("./projects-model");
const {idValidation, nameAndDescriptionVld} = require("./projects-middleware");

router.get("/" , async (req, res, next)=>{
    try {
        const allProjects = await projectsModel.get();
        res.json(allProjects);
    } catch (error) {
        next(error);
    }
})
router.get("/:id" ,idValidation, async (req, res, next)=>{
    try {
        res.json(req.project);
    } catch (error) {
        next(error);
    }
})
router.post("/",nameAndDescriptionVld, async (req, res, next)=>{
    try {
        const payload = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        const newProject = await projectsModel.insert(payload);
        res.json(newProject);
    } catch (error) {
        next(error);
    }
})
router.put("/:id",nameAndDescriptionVld,idValidation, async (req, res, next)=>{
    try {
        const payload = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        const updatedProject = await projectsModel.update(req.params.id, payload);
        res.json(updatedProject);
    } catch (error) {
        next(error);
    }
})
router.delete("/:id",idValidation,async (req, res, next)=>{
    try {
        res.json(await projectsModel.remove(req.params.id));
    } catch (error) {
        next(error);
    }
})
router.get("/:id/actions",idValidation,async (req, res, next)=>{
    try {
        const actions = await projectsModel.getProjectActions(req.params.id);
        res.json(actions);
    } catch (error) {
        next(error);
    }
})

module.exports = router;