"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topics_route_1 = require("./topics.route");
const song_route_1 = require("./song.route");
const favorite_song_route_1 = require("./favorite-song.route");
const sreach_route_1 = require("./sreach.route");
const clientRoutes = (app) => {
    app.use('/topics', topics_route_1.topicRoutes);
    app.use('/songs', song_route_1.songRoutes);
    app.use('/favorite-songs', favorite_song_route_1.favoriteSongRoutes);
    app.use('/sreach', sreach_route_1.sreachRoutes);
};
exports.default = clientRoutes;
