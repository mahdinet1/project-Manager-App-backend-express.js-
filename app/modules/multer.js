const multer = require("multer");
const { createUploadPath } = require("./helperFunc");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, createUploadPath());
    },
    filename: (req, file, cb) => {
        const format = path.extname(file?.originalname || "");
        cb(null, Date.now() + "" + format);
    },
});

const Multerupload = multer({
    storage,
    limits: {
        fields: 1,
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!file) throw "select a file";
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error("file format not supported!"));
        }
    },
});

module.exports = {
    Multerupload,
};
