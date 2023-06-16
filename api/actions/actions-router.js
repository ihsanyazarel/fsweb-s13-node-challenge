// "eylem" routerını buraya yazın
const router = require("express").Router();
const { actIdValidation, payloadValidation, existProjectVld } = require("./actions-middlware");
const actionsModel = require("./actions-model");

router.get("/" , async (req, res, next)=>{
    try {
        const allActions = await actionsModel.get();
        res.json(allActions);
    } catch (error) {
        next(error);
    }
})
router.get("/:id" ,actIdValidation, async (req, res, next)=>{
    try {
        res.json(req.action);
    } catch (error) {
        next(error);
    }
})
router.post("/",payloadValidation,existProjectVld, async (req, res, next)=>{
    try {
        const payload = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
        const newAction = await actionsModel.insert(payload);
        res.status(201).json(newAction);
    } catch (error) {
        next(error);
    }
})
router.put("/:id",actIdValidation,payloadValidation,existProjectVld, async (req, res, next)=>{
    try {
        const payload = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
        const updatedAction = await actionsModel.update(req.params.id, payload);
        res.json(updatedAction);
    } catch (error) {
        next(error);
    }
})
router.delete("/:id",actIdValidation, async (req, res, next)=>{
    try {
        res.json(await actionsModel.remove(req.params.id));
    } catch (error) {
        next(error);
    }
})


module.exports = router;