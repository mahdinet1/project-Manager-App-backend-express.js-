const { body } = require("express-validator");

function createProjectValidator() {
    return [
        body("title").notEmpty().withMessage("عنوان نمیتواند خالی باشد."),
        body("description").isString().optional(),
        body("teams").isMongoId().optional(),
        body("owner").isMongoId().withMessage("ایدی باید وارد شود."),
        body("status").isString().optional(),
        body("private").isBoolean().optional(),
        body("show").isBoolean().optional(),
    ];
}

module.exports = {
    createProjectValidator,
};
