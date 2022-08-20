const { body, validationResult } = require("express-validator");
function registerValidator() {
    return [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").notEmpty().isEmail(),
        body("mobile").notEmpty().isMobilePhone("fa-IR"),
        body("password").notEmpty().isLength({ min: 6 }),
    ];
}
module.exports = { registerValidator };
