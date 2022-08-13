const router = require("express").Router();
const { authRouter } = require("./auth.router");
const { userRouter } = require("./user.router");
const { teamRouter } = require("./team.router");
const { projectRouter } = require("./project.router");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/team", teamRouter);
router.use("/project", projectRouter);

module.exports = {
    AppRouter: router,
};
