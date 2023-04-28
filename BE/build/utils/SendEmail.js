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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailNodeMaier = void 0;
var mail_1 = __importDefault(require("@sendgrid/mail"));
var http_status_1 = __importDefault(require("http-status"));
var APIError_1 = __importDefault(require("../utils/APIError"));
var nodemailer = require('nodemailer');
var appConfig_1 = __importDefault(require("../configs/appConfig"));
var logger_1 = __importDefault(require("./logger"));
var appConfig_2 = __importDefault(require("../configs/appConfig"));
var sendEmail = function (email, otp) { return __awaiter(void 0, void 0, void 0, function () {
    var msg, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                msg = {
                    from: appConfig_1.default.sendGrid.email,
                    to: email,
                    templateId: appConfig_1.default.sendGrid.template,
                    dynamic_template_data: { otp: otp },
                };
                logger_1.default.info(msg);
                mail_1.default.setApiKey(appConfig_1.default.sendGrid.key);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, mail_1.default.send(msg)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                logger_1.default.info(err_1);
                throw new APIError_1.default({
                    message: 'Error Send Email',
                    status: http_status_1.default.FORBIDDEN,
                });
            case 4: return [2 /*return*/];
        }
    });
}); };
var sendMailNodeMaier = function (email, otp) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, mainOptions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transporter = nodemailer.createTransport({
                    // config mail server
                    service: 'Gmail',
                    auth: {
                        user: appConfig_2.default.userNodemail,
                        pass: appConfig_2.default.passwordNodemail,
                    },
                });
                mainOptions = {
                    // thiết lập đối tượng, nội dung gửi mail
                    from: 'Website mỹ phẩm ',
                    to: email,
                    subject: 'Thanks For Choosing Us',
                    text: 'You recieved message from ',
                    html: "\n    <!DOCTYPE html>\n<html>\n  <head>\n    \n   \n    <style>\n    .wrap{\n      padding:30px;\n      max-width: 900px;\n      border:10px solid pink;\n    }\n    h1{\n      text-align: center;\n    }\n    img{\n      display:block;\n      margin:0 auto;\n    }\n      h2{\n        color:pink;\n      }\n      p{\n        color: pink;\n      }\n       h3{\n      border:3px solid pink;\n      width:fit-content;\n      padding:10px 15px;\n      margin:0 auto;\n    }\n    .otp{\n      color:green;\n      font-size: 30px;\n    }\n    </style>\n  </head>\n  <body>\n    <div class='wrap'>\n      <h1>Thanks You !</h1>\n      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFv-L7kcWafx-hmaN-EkU-bI-rGYl6fAKq2s04nmRKREUXci_zvw_XoszuGuwxAs75mE&usqp=CAU'alt='noimg'/>\n      <h2> C\u1EA3m \u01A1n <i>".concat(email, "</i> \u0111\u00E3 s\u1EED d\u1EE5ng d\u1ECBch v\u1EE5 c\u1EE7a ch\u00FAng t\u00F4i </h2>\n     <p>\u0110\u00E2y l\u00E0 m\u00E3 <strong>OTP</strong> \u0111\u1EC3 b\u1EA1n truy c\u1EADp website:</p> \n      <hr/>\n      <h3><span class='otp'>").concat(otp, "</span></h3>\n    </div>\n     \n  </body>\n</html>\n    "),
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, transporter.sendMail(mainOptions, function (error) {
                        if (error) {
                            logger_1.default.info(error);
                            throw new APIError_1.default({
                                message: 'Error Send Email',
                                status: http_status_1.default.FORBIDDEN,
                            });
                        }
                        else {
                            logger_1.default.info('send successfully');
                        }
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                throw new APIError_1.default({
                    message: 'Error Send Email',
                    status: http_status_1.default.FORBIDDEN,
                });
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendMailNodeMaier = sendMailNodeMaier;
exports.default = sendEmail;
