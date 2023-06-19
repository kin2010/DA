import bodyParser from "body-parser";
import httpStatus from "http-status";
import morgan from "morgan";
import connectToDb from "./configs/database";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import route from "./router/index";

import {
  groupChat,
  meetingChat,
  userExit,
  userStartMeeting,
} from "./fuc/meeting";
import { Course } from "./models";
import { Schema } from "mongoose";
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

const groupOnlines: any = {};
app.use("/api", route);
let secret =
  "sk_test_51LMxCAI6HAK9mOVZ7xKAVLvrxjVYNFzMs76u982XHNRqlpSPsY0gzaTDlJ8UxaiqMR7CarhZauZxCFuvP2S15zM500edPrGS1g";
const stripe = require("stripe")(secret);
app.post("/payment", async (req: any, res: any) => {
  console.log(req?.body);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req?.body?.items?.map((item: any) => {
        return {
          price_data: {
            currency: "vnd",
            product_data: {
              name: item?.name,
              images: [
                !!item?.thumbnail?.length
                  ? item?.thumbnail[0]
                  : "http://localhost:3000/images/course.jpg",
              ],
            },
            unit_amount: item?.price,
          },
          quantity: 1,
        };
      }),
      success_url: req?.body?.success_url || "",
      cancel_url: req?.body?.cancel_url || "",
    });
    const course = req?.body?.courses?.map((c: any) => {
      return c;
      return new Schema.Types.ObjectId(c);
    });
    await Course.updateMany(
      {
        _id: { $in: course },
      },

      { $addToSet: { users: req?.body?.user } },
      { new: true }
    );
    console.log(11, course, req?.body?.user);
    res.json({ url: session.url });
  } catch (e: any) {
    res.status(500).json({ error: e?.message });
  }
});
const onlineUsers = new Map();

io.on("connect", (socket: any) => {
  console.log(socket?.id, " connected");

  const userId = socket.handshake.query?.userId;
  const roomQuery = socket.handshake.query?.roomUrl;
  const groupQuery = socket.handshake.query?.group;
  if (!!groupQuery) {
    socket.join(groupQuery);
  }
  try {
    socket.on("subscribe", async (data: any) => {
      //subscribe/join a room
      //  room: room,
      // socketId: socket.id,
      console.log(99999999999);
      const meetingId = data?.room;
      const roomInfo = await userStartMeeting(meetingId, userId);
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
        userId: userId,
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

    socket.on("group_chat", async (data: any) => {
      const { group, sender, msg, time } = data;
      const newMsg = await groupChat({
        userId: userId,
        msg: msg,
        group: group,
        time: time,
      });
      console.log("new", newMsg);
      io.to(group).emit("group_chat", {
        sender: data.sender,
        msg: data.msg,
        newMsg: newMsg,
      });
    });
    socket.on("group_join", async (data: any) => {
      const { userId: newId, group } = data;
      const ol = !!groupOnlines[group] ? groupOnlines[group] : [];
      const newOl = [...ol, newId];
      groupOnlines[group] = newOl;
      io.to(group).emit("group_join", {
        onlines: newOl,
      });
    });

    socket.on("disconnect", async () => {
      const rs = await userExit(userId, roomQuery);
      // const newOnlines = rs?.meeting?.users || [];
      console.log(rs, "exit");
      socket.to(roomQuery).emit("user_exit", {
        data: rs,
      });
      const onlines = groupOnlines[groupQuery] || [];
      const cp = onlines;
      const index = onlines.indexOf(userId);
      cp.splice(index, 1);
      socket.to(groupQuery).emit("group_exit", {
        onlines: cp,
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
