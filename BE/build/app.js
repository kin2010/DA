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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var http_status_1 = __importDefault(require("http-status"));
var morgan_1 = __importDefault(require("morgan"));
var database_1 = __importDefault(require("./configs/database"));
var cors_1 = __importDefault(require("cors"));
var error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
var index_1 = __importDefault(require("./router/index"));
var meeting_1 = require("./fuc/meeting");
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
// const stream = require("./webs/stream");
var port = 3333;
var room = [];
var client = [];
// let activeSockets: {
//   room: string;
//   id: string;
// }[] = [];
// io.on("connect", (socket: any) => {
//   socket.on("joinRoom", (room: string) => {
//     const existingSocket = activeSockets?.find(
//       (s) => s.room === room && s.id === socket.id
//     );
//     if (!existingSocket) {
//       activeSockets = [...activeSockets, { id: socket.id, room }];
//       socket.emit(`${room}-update-user-list`, {
//         users: activeSockets
//           .filter((s) => s.room === room && s.id !== socket.id)
//           .map((existingSocket) => existingSocket.id),
//         current: socket.id,
//       });
//       socket.broadcast.emit(`${room}-add-user`, {
//         user: socket.id,
//       });
//     }
//     console.log(`Client ${socket.id} joined ${room}`);
//   });
//   socket.on("call-user", (data: any) => {
//     socket.to(data.to).emit("call-made", {
//       offer: data.offer,
//       socket: socket.id,
//     });
//   });
//   socket.on("make-answer", (data: any) => {
//     socket.to(data.to).emit("answer-made", {
//       socket: socket.id,
//       answer: data.answer,
//     });
//   });
//   socket.on("'reject-call", (data: any) => {
//     socket.to(data.from).emit("call-rejected", {
//       socket: socket.id,
//     });
//   });
//   socket.on("disconnect", () => {
//     const existingSocket = activeSockets.find((sc) => sc.id === socket.id);
//     if (!existingSocket) return;
//     activeSockets = activeSockets.filter((sc) => sc.id !== socket.id);
//     socket.broadcast.emit(`${existingSocket.room}-remove-user`, {
//       socketId: socket.id,
//     });
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });
var getRoomMember = function (id) {
    room.forEach(function (a) {
        var _a;
        if (!!((_a = room[a]) === null || _a === void 0 ? void 0 : _a.length)) {
            var index = room[a].findIndex(function (z) { return z === id; });
            if (index !== -1) {
                return room[a].splice(index, 1);
            }
        }
    });
    return [];
};
(0, morgan_1.default)("tiny");
/** Parser the request **/
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
/** Cors **/
app.use((0, cors_1.default)());
/** Rules of our API **/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET POST PUT DELETE PATCH");
        return res.status(http_status_1.default.OK).end();
    }
    return next();
});
app.use("/api", index_1.default);
var onlineUsers = new Map();
io.on("connect", function (socket) {
    var _a, _b;
    console.log(socket === null || socket === void 0 ? void 0 : socket.id, " connected");
    var userId = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.userId;
    var roomQuery = (_b = socket.handshake.query) === null || _b === void 0 ? void 0 : _b.roomUrl;
    try {
        socket.on("subscribe", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var mtgRoom, roomInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mtgRoom = data === null || data === void 0 ? void 0 : data.room;
                        return [4 /*yield*/, (0, meeting_1.userStartMeeting)(mtgRoom, userId)];
                    case 1:
                        roomInfo = _a.sent();
                        socket.join(data.room);
                        //join with socker id
                        // socket.join(socket.id);
                        if (!room[data.room]) {
                            room.push(data.room);
                            room[data.room] = [];
                        }
                        else {
                            room.push(data.room);
                        }
                        room[data.room] = __spreadArray([socket.id], room[data.room], true);
                        //Inform other members in the room of new user's arrival
                        if (socket.adapter.rooms.has(data.room) === true) {
                            // console.log("room", socket.adapter.rooms);
                            socket.to(data.room).emit("server_new_user_to_all", {
                                //send to all room except the sender
                                socketId: socket.id,
                                member: room[data.room],
                                room: data.room,
                            });
                        }
                        io.to(data.room).emit("member", roomInfo);
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("old_user_send_server", function (data) {
            //  to: data.socketId,
            // sender: socket?.id,
            socket.to(data.new).emit("server_send_new_user", {
                //send den user mới những thành viên
                // có sẵn
                sender: data.sender,
                member: getRoomMember(data.socketId),
            });
        });
        socket.on("sdp", function (data) {
            //goi đến thằng mới
            //sender: old user
            //desc: des của thèn mới bên remote
            socket
                .to(data.new)
                .emit("sdp", { description: data.description, sender: data.sender });
        });
        //
        socket.on("new_user_send_ice", function (data) {
            socket.to(data.to).emit("recieve_ice_from_new_user", {
                candidate: data.candidate,
                sender: data.sender,
                // member:
            });
        });
        socket.on("chat", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var room, sender, msg, time, newMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        room = data.room, sender = data.sender, msg = data.msg, time = data.time;
                        return [4 /*yield*/, (0, meeting_1.meetingChat)({
                                userId: sender,
                                message: msg,
                                room: room,
                                time: time,
                            })];
                    case 1:
                        newMsg = _a.sent();
                        io.to(data.room).emit("chat", {
                            sender: data.sender,
                            msg: data.msg,
                            newMsg: newMsg,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("disconnect", function () { return __awaiter(void 0, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, meeting_1.userExit)(userId, roomQuery)];
                    case 1:
                        rs = _a.sent();
                        // const newOnlines = rs?.meeting?.users || [];
                        console.log(rs, "exit");
                        socket.to(roomQuery).emit("user_exit", {
                            data: rs,
                        });
                        console.log("Client disconnected" + socket.id); // Khi client disconnect thì log ra terminal.
                        return [2 /*return*/];
                }
            });
        }); });
    }
    catch (error) {
        // console.log(2333, error);
    }
});
/** Logging the request **/
app.use((0, morgan_1.default)(":remote-addr :method :url :status :response-time ms"));
/** Error handling **/
app.use(error_middleware_1.default.routeNotFound);
app.use(error_middleware_1.default.handler);
server.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Server running in port: " + port);
                return [4 /*yield*/, (0, database_1.default)()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
