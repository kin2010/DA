"use strict";
var stream = function (socket) {
    console.log(socket === null || socket === void 0 ? void 0 : socket.id, " connected");
    socket.emit("getId", {
        id: socket.id,
    });
    socket.on("subscribe", function (data) {
        //subscribe/join a room
        console.log(22, socket.id);
        socket.join(data.room);
        socket.join(socket.id);
        //Inform other members in the room of new user's arrival
        if (socket.adapter.rooms.has(data.room) === true) {
            socket.to(data.room).emit("new user", { socketId: socket.id });
        }
    });
    socket.on("newUserStart", function (data) {
        console.log(1, "thenmoi", data);
        socket.to(data.to).emit("newUserStart", { sender: data.sender });
    });
    socket.on("sdp", function (data) {
        socket
            .to(data.to)
            .emit("sdp", { description: data.description, sender: data.sender });
    });
    socket.on("ice candidates", function (data) {
        console.log("ice candidates", data);
        socket.to(data.to).emit("ice candidates", {
            candidate: data.candidate,
            sender: data.sender,
        });
    });
    socket.on("chat", function (data) {
        socket.to(data.room).emit("chat", { sender: data.sender, msg: data.msg });
    });
    socket.on("disconnect", function () {
        console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
};
module.exports = stream;
