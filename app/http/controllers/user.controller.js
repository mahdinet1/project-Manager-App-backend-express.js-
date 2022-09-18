const UserModel = require("../../models/user.model");

class UserController {
    getProfile(req, res, next) {
        try {
            const user = req.user;
            user.image =
                req.protocol + "://" + req.get("host") + user.image.substring(6).replace(/[\\\\]/gm, "/");
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    user,
                },
            });
        } catch (error) {
            next(error);
        }
    }
    async updateProfile(req, res, next) {
        try {
            const { name, mobile } = req.body;
            const editableFields = ["name"];
            const badValues = [0, NaN, null, undefined, ""];
            const keys = Object.keys(req.body);
            if (!keys.length > 0) throw { status: 400, message: `no field for update !!`, data: {} };
            Object.entries(req.body).forEach(([key, value]) => {
                if (!editableFields.includes(key))
                    throw { status: 400, message: `${key} can not be edited!`, data: {} };
                else {
                    if (value && badValues.includes(value.trim())) {
                        throw { status: 400, message: `${key} can not be ${value}!`, data: {} };
                    }
                }
            });
            const user = await UserModel.findByIdAndUpdate(req.user._id, { name });
            if (user)
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "your profile is updated!",
                    data: {},
                });
            throw { status: 500, message: "internal error", data: {} };
        } catch (error) {
            next(error);
        }
    }

    async uploadPhoto(req, res, next) {
        try {
            const file_path = req.file?.path;
            const user = await UserModel.findByIdAndUpdate(req.user._id, { image: file_path });

            res.status(200).json({ message: "file uploaded successfully", status: 200 });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    UserController: new UserController(),
};
