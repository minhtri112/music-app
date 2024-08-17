import { Express } from "express";
import { topicRoutes } from "./topics.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { sreachRoutes } from "./sreach.route";

const clientRoutes = (app : Express) : void =>{
    app.use('/topics', topicRoutes);
    app.use('/songs', songRoutes);
    app.use('/favorite-songs', favoriteSongRoutes);
    app.use('/sreach', sreachRoutes);
}

export default clientRoutes;