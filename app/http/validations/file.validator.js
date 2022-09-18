const { body } = require("express-validator");
const path = require("path");
const imageValidator = () => {
    return [
        body("image").custom((image, { req }) => {
           
            if (Object.keys(req.file).length === 0) throw "لطفا یک تصویر انتخاب کنید.";
            const ext = path.extname(req.file?.originalname);
            const allowedTypes = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
            if (!allowedTypes.includes(ext)) throw "فرمت صحیح نمی باشد.";
            const maxSize = 2 * 1024 * 1024;
            if (req.file.size > maxSize) throw "حجم فایل بیش از 2 مگ نمیتواند باشد.";
            return true;
        }),
    ];
};

module.exports = {
    imageValidator,
};
