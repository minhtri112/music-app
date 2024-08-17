"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.songs = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const songs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield songs_model_1.default.find({
        deleted: false,
    });
    res.render('admin/pages/songs/index.pug', {
        pageTitle: "Danh sách bài hát",
        songs: songs
    });
});
exports.songs = songs;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName");
    res.render('admin/pages/songs/create.pug', {
        pageTitle: "Tạo bài hát",
        topics: topics,
        singers: singers
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSong = {
        title: req.body.title || "",
        description: req.body.description || "",
        singerId: req.body.singerId || "",
        topicId: req.body.topicId || "",
        avatar: req.body.avatar[0] || "",
        status: req.body.status || "active",
        audio: req.body.audio[0] || "",
        lyrics: req.body.lyrics || "",
    };
    const song = new songs_model_1.default(dataSong);
    yield song.save();
    res.redirect(`/admin/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield songs_model_1.default.findOne({
        _id: id,
        deleted: false,
        status: "active"
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName");
    res.render('admin/pages/songs/edit.pug', {
        pageTitle: "Tạo bài hát",
        topics: topics,
        singers: singers,
        song: song
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataSong = {
        title: req.body.title || "",
        description: req.body.description || "",
        singerId: req.body.singerId || "",
        topicId: req.body.topicId || "",
        status: req.body.status || "active",
        lyrics: req.body.lyrics || "",
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0];
    }
    yield songs_model_1.default.updateOne({
        _id: id
    }, dataSong);
    res.redirect(`back`);
});
exports.editPatch = editPatch;
