const { UserController } = require("../http/controllers/user.controller");
const { checkLoggin, expressValidatorMapper } = require("../http/middlewares/auth.middlewares");
const { imageValidator } = require("../http/validations/file.validator");
const { editProfileValidator } = require("../http/validations/user.validator");
const { Multerupload } = require("../modules/multer");

const router = require("express").Router();

router.get("/profile", checkLoggin, UserController.getProfile);
router.post("/update", checkLoggin, UserController.updateProfile);
router.post("/upload-photo", checkLoggin, Multerupload.single("image"), UserController.uploadPhoto);
module.exports = {
    userRouter: router,
};
