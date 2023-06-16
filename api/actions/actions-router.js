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
        const newAction = await actionsModel.insert(req.body);
        res.status(201).json(newAction);
    } catch (error) {
        next(error);
    }
})
router.put("/:id",actIdValidation,payloadValidation,existProjectVld, async (req, res, next)=>{
    try {
        const updatedAction = await actionsModel.update(req.params.id, req.body);
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