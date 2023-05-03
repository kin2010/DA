import bodyParser from "body-parser";
import httpStatus from "http-status";
import morgan from "morgan";
import connectToDb from "./configs/database";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import route from "./router/index";
import { Socket } from "socket.io";
import axios from "axios";
import configs from "./configs/appConfig";
import { serviceFetch } from "./utils/fetch";
import { meetingChat, userExit, userStartMeeting } from "./fuc/meeting";

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// const stream = require("./webs/stream");
const port = 3333;

const room: any = [];
const client = [];

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

const getRoomMember = (id: any) => {
  room.forEach((a: any) => {
    if (!!room[a]?.length) {
      const index = room[a].findIndex((z: any) => z === id);
      if (index !== -1) {
        return room[a].splice(index, 1);
      }
    }
  });
  return [];
};
morgan("tiny");

/** Parser the request **/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Cors **/
app.use(cors());

/** Rules of our API **/
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET POST PUT DELETE PATCH");
    return res.status(httpStatus.OK).end();
  }

  return next();
});

app.use("/api", route);

const onlineUsers = new Map();

io.on("connect", (socket: any) => {
  console.log(socket?.id, " connected");

  const userId = socket.handshake.query?.userId;
  const roomQuery = socket.handshake.query?.roomUrl;
  try {
    socket.on("subscribe", async (data: any) => {
      //subscribe/join a room
      //  room: room,
      // socketId: socket.id,
      const mtgRoom = data?.room;
      const roomInfo = await userStartMeeting(mtgRoom, userId);
      socket.join(data.room);
      //join with socker id
      // socket.join(socket.id);
      if (!room[data.room]) {
        room.push(data.room);
        room[data.room] = [];
      } else {
        room.push(data.room);
      }
      room[data.room] = [socket.id, ...room[data.room]];
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
    });
    socket.on("old_user_send_server", (data: any) => {
      //  to: data.socketId,
      // sender: socket?.id,
      socket.to(data.new).emit("server_send_new_user", {
        //send den user mới những thành viên
        // có sẵn
        sender: data.sender,
        member: getRoomMember(data.socketId),
      });
    });

    socket.on("sdp", (data: any) => {
      //goi đến thằng mới
      //sender: old user
      //desc: des của thèn mới bên remote
      socket
        .to(data.new)
        .emit("sdp", { description: data.description, sender: data.sender });
    });
    //
    socket.on("new_user_send_ice", (data: any) => {
      socket.to(data.to).emit("recieve_ice_from_new_user", {
        candidate: data.candidate,
        sender: data.sender,
        // member:
      });
    });

    socket.on("chat", async (data: any) => {
      const { room, sender, msg, time } = data;
      const newMsg = await meetingChat({
        userId: sender,
        message: msg,
        room: room,
        time: time,
      });
      io.to(data.room).emit("chat", {
        sender: data.sender,
        msg: data.msg,
        newMsg: newMsg,
      });
    });

    socket.on("disconnect", async () => {
      const rs = await userExit(userId, roomQuery);
      // const newOnlines = rs?.meeting?.users || [];
      console.log(rs, "exit");
      socket.to(roomQuery).emit("user_exit", {
        data: rs,
      });
      console.log("Client disconnected" + socket.id); // Khi client disconnect thì log ra terminal.
    });
  } catch (error) {
    // console.log(2333, error);
  }
});

/** Logging the request **/
app.use(morgan(":remote-addr :method :url :status :response-time ms"));

/** Error handling **/
app.use(errorMiddleware.routeNotFound);
app.use(errorMiddleware.handler);
server.listen(port, async () => {
  console.log("Server running in port: " + port);
  await connectToDb();
});
