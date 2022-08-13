const { Schema, Types, model } = require("mongoose");

const teamSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        users: [{ type: Types.ObjectId, ref: "User", default: [] }],
        projects: [{ type: Types.ObjectId, ref: "Project", default: [] }],
        owner: { type: Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true,
    }
);
const TeamModel = model("Team", teamSchema);
module.exports = TeamModel;
