const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, default: null },
        teams: [{ type: [Types.ObjectId], ref: "Team", default: [] }],
        projects: [{ type: [Types.ObjectId], ref: "Project", default: [] }],
        token: { type: String, default: "" },
        role: { type: String, default: "user" },
    },
    {
        timestamps: true,
    }
);

const UserModel = model("User", userSchema);
module.exports = UserModel;
