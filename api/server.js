const express = require('express');
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
const server = express();
server.use(express.json());
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
server.use("/api/actions", actionsRouter);
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
server.use("/api/projects", projectsRouter);
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;
