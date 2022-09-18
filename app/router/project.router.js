const { ProjectController } = require("../http/controllers/project.controller");
const { checkLoggin, expressValidatorMapper } = require("../http/middlewares/auth.middlewares");
const {createProjectValidator} = require("../http/validations/project.validator")
const router = require("express").Router();

router.post("/create", checkLoggin,createProjectValidator(),expressValidatorMapper, ProjectController.createProject);

module.exports = {
    projectRouter: router,
};
