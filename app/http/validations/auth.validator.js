const { body, validationResult } = require("express-validator");
const UserModel = require("../../models/user.model");
function registerValidator() {
    return [
        body("name").notEmpty().withMessage("Name is required"),
        body("email")
            .notEmpty()
            .isEmail()
            .custom(async (email) => {
                user = await UserModel.findOne({ email });
                if (user) throw "your email exist!";
                return true;
            }),
        body("mobile")
            .notEmpty()
            .isMobilePhone("fa-IR")
            .custom(async (mobile) => {
                user = await UserModel.findOne({ mobile });
                if (user) throw "your mobile exist!";
                return true;
            }),
        body("password").notEmpty().isLength({ min: 6 }),
    ];
}
function loginValidator() {
    return [
        body("email").notEmpty().isEmail().withMessage("email is not valid"),
        body("password").notEmpty().isLength({ min: 4 }).withMessage("password is not valid."),
    ];
}
module.exports = { registerValidator, loginValidator };
