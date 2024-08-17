import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { songRoutes } from "./songs.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app : Express) : void =>{
    app.use('/admin/dashboard', dashboardRoutes);

    app.use('/admin/songs', songRoutes);

    app.use('/admin/upload', uploadRoutes);
}

export default adminRoutes;