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
exports.uploadFields = exports.uploadSingle = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});
const uploadToCloudinary = (buffer, resourceType) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (result) {
                resolve(result.url);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
});
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req["file"]) {
        try {
            const result = yield uploadToCloudinary(req["file"].buffer, 'image');
            req.body.file = result;
        }
        catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    next();
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req["files"]);
    for (const key in req["files"]) {
        req.body[key] = [];
        const arrays = req["files"][key];
        for (const item of arrays) {
            try {
                const resourceType = key === 'audio' ? 'video' : 'image';
                const result = yield uploadToCloudinary(item.buffer, resourceType);
                req.body[key].push(result);
            }
            catch (error) {
                console.error(`Error uploading ${key}:`, error);
            }
        }
    }
    next();
});
exports.uploadFields = uploadFields;
