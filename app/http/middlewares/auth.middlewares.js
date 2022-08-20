const { validationResult } = require("express-validator");
function expressValidatorMapper(req, res, next) {
    const messages = {};
    const result = validationResult(req);
    if (result.errors.length > 0) {
        result.errors.forEach((error) => {
            messages[error.param] = error.msg;
        });
        return res.status(400).json({
            status: 400,
            message: messages,
            success: false,
        });
    }
    next();
}
module.exports = { expressValidatorMapper };
