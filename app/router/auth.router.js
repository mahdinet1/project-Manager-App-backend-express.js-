const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/auth.middlewares");
const { registerValidator, loginValidator } = require("../http/validations/auth.validator");

const router = require("express").Router();

router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register);
router.post("/login", loginValidator(), expressValidatorMapper, AuthController.login);
module.exports = {
    authRouter: router,
};
