const { validationResult } = require("express-validator");
const UserModel = require("../../models/user.model");
const { hashString, jwtGenerator } = require("../../modules/helperFunc");
const bcrypt = require("bcrypt");
class AuthController {
    async register(req, res, next) {
        try {
            const { body } = req;
            const { email, mobile, password } = body;
            user = await UserModel.create({
                ...body,
                password: hashString(password),
            });
            if (user) return res.status(201).json(user);
            throw { status: 500, message: "user is not created" };
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) throw { status: "401", message: "email or password is not valid." };
            const comparePasswordResult = bcrypt.compareSync(password, user.password);
            if (!comparePasswordResult) throw { status: "401", message: "email or password is not valid." };
            const token = jwtGenerator({ email });
            user.token = token;
            await user.save();
            return res.status(200).json({
                status: 200,
                success: true,
                message: "you logged in successfuly !",
                data: {
                    token,
                },
            });
        } catch (error) {
            next(error);
        }
    }
    logout() {}
}

module.exports = {
    AuthController: new AuthController(),
};
