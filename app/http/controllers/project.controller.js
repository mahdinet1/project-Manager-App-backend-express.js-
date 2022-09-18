const ProjectModel = require("../../models/project.model");
class ProjectController {
    async createProject(req, res, next) {
        try {
            const data = req.body;
            const validKeys = ["title", "description", "owner", "status", "private", "show"];
            const dataKeys = Object.keys(req.body);
            dataKeys.forEach((item) => {
                if (!validKeys.includes(item)) delete data[item];
            });
            const project = await ProjectModel.create(data);
            if (project) return res.json(data);
            throw { status: 500, message: "project not created!" };
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    ProjectController: new ProjectController(),
};
