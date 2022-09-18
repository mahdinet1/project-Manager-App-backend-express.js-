const { body } = require("express-validator");
const UserModel = require("../../models/user.model");
function editProfileValidator() {
    return [
        body("email")
            .notEmpty()
            .withMessage("email is required!")
            .isEmail()
            .custom(async (email) => {
                const user = await UserModel.find({ email });
                if (user) throw { status: 400, message: "email is exist!" };
                return true;
            }),
        body("name").notEmpty().withMessage("name is required"),
        body("mobile")
            .notEmpty()
            .withMessage("mobile is required")
            .isMobilePhone("fa-IR")
            .custom(async (mobile) => {
                const user = await UserModel.find({ mobile });
                if (user) throw { status: 400, message: "mobile is exist!1" };
                return true;
            }),
    ];
}
module.exports = { editProfileValidator };
