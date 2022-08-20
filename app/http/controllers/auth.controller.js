const {validationResult} = require("express-validator");
class AuthController {
    register(req, res,next) {
        try {
         return res.status(200).json({
            status: 200,
            message: "User registered successfully",
            success: true,
         })
          
        } catch (error) {
            next(error)
        }
    }
    login() {}
    logout() {}
}

module.exports = {
    AuthController: new AuthController(),
};
