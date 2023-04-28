"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var MulterMiddleware = /** @class */ (function () {
    function MulterMiddleware() {
    }
    MulterMiddleware.storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "src/uploads");
        },
        filename: function (req, file, cb) {
            cb(null, "".concat(Date.now(), "-").concat(file.originalname));
        },
    });
    MulterMiddleware.upload = (0, multer_1.default)({
        storage: MulterMiddleware.storage,
        limits: { fileSize: 1024 * 1024 },
        fileFilter: function (req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/gi)) {
                return cb(new Error("Only image files are allowed!"), false);
            }
            cb(null, true);
        },
    });
    MulterMiddleware.uploadVideo = (0, multer_1.default)({
        storage: MulterMiddleware.storage,
        limits: { fileSize: 1024 * 1024 * 99 },
        fileFilter: function (req, file, cb) {
            if (!file.originalname.match(/\.(mp3|mp4|)$/gi)) {
                return cb(new Error("Only Video files are allowed!"), false);
            }
            cb(null, true);
        },
    });
    return MulterMiddleware;
}());
exports.default = MulterMiddleware;
