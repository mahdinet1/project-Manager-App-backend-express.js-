const { validationResult } = require("express-validator");
const UserModel = require("../../models/user.model");
const { verifyToken } = require("../../modules/helperFunc");
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

async function checkLoggin(req, res, next) {
    try {
        const authMessage = { status: 401, message: "unAuthorotized" };
        const auth = req?.headers?.authorization;
        if (!auth) throw authMessage;
        const token = auth.split(" ")?.[1];
        const firstOfToken = auth.split(" ")?.[0];
        if (!firstOfToken || firstOfToken !== "Bearer") throw authMessage;
        if (!token) throw authMessage;
        const result = verifyToken(token);
        const user = await UserModel.findOne({ email: result.email }, { password: 0, __v: 0, token: 0 });
        if (!user) throw authMessage;
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = { expressValidatorMapper, checkLoggin };
