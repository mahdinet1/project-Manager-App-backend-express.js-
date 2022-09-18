const hashString = (str) => {
    const bcrypt = require("bcrypt");
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(str, salt);
};
const jwtGenerator = (payload) => {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: "3 days" });
    return token;
};
const verifyToken = (token) => {
    const jwt = require("jsonwebtoken");
    const res = jwt.verify(token, process.env.PRIVATE_KEY);
    if (!res?.email) throw { status: 401, message: "unauthoritized" };
    return res;
};
const createUploadPath = () => {
    const fs = require("fs");
    const path = require("path");
    let now = new Date();
    const day = now.getDay() + "";
    const month = now.getMonth() + "";
    const year = now.getFullYear() + "";
    const uploadPath = path.join(__dirname, "..", "..", "public", "uploads", year, month, day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return path.join("public", "uploads", year, month, day);
};

module.exports = { hashString, jwtGenerator, verifyToken, createUploadPath };
