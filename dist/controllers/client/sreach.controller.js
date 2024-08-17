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
exports.result = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const converToSlug_1 = require("../../helpers/converToSlug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyValue = req.query.keyword;
    const type = req.params.type;
    let newSongs = [];
    if (keyValue) {
        const keywordRegex = new RegExp(keyValue, "i");
        const stringSlug = (0, converToSlug_1.convertToSlug)(keyValue);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        const songs = yield songs_model_1.default.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ]
        });
        for (const item of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: item.singerId
            });
            item["infoSinger"] = infoSinger;
            newSongs.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                infoSinger: {
                    fullName: infoSinger.fullName
                }
            });
        }
    }
    if (type === "sreach") {
        res.render("client/pages/sreach/index.pug", {
            pageTitle: "Kết quả tìm kiếm",
            keyValue: keyValue,
            songs: newSongs
        });
    }
    else {
        res.json({
            code: 200,
            message: "Thành công",
            songs: newSongs
        });
    }
});
exports.result = result;
