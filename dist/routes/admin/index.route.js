"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const songs_route_1 = require("./songs.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    app.use('/admin/dashboard', dashboard_route_1.dashboardRoutes);
    app.use('/admin/songs', songs_route_1.songRoutes);
    app.use('/admin/upload', upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
