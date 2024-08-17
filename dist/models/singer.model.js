"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const singSchema = new mongoose_1.default.Schema({
    fullName: String,
    avatar: String,
    status: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date,
}, {
    timestamps: true,
});
const Singer = mongoose_1.default.model("Singer", singSchema, "singers");
exports.default = Singer;
