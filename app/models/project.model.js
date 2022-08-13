const { Schema, Types, model } = require("mongoose");

const projectSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        teams: [{ type: Types.ObjectId, ref: "Team", default: [] }],
        owner: { type: Types.ObjectId, ref: "User", required: true },
        status: { type: String, default: "active" },
        private: { type: Boolean, default: false },
        show: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);
const ProjectModel = model("Project", projectSchema);
module.exports = ProjectModel;
