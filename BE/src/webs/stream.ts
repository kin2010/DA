const stream = (socket:any) => {
  console.log(socket?.id, " connected");
  socket.emit("getId", {
    id: socket.id,
  });
  socket.on("subscribe", (data:any) => {
    //subscribe/join a room
    console.log(22, socket.id);
    socket.join(data.room);
    socket.join(socket.id);

    //Inform other members in the room of new user's arrival
    if (socket.adapter.rooms.has(data.room) === true) {
      socket.to(data.room).emit("new user", { socketId: socket.id });
    }
  });

  socket.on("newUserStart", (data:any) => {
    console.log(1, "thenmoi", data);
    socket.to(data.to).emit("newUserStart", { sender: data.sender });
  });

  socket.on("sdp", (data:any) => {
    socket
      .to(data.to)
      .emit("sdp", { description: data.description, sender: data.sender });
  });

  socket.on("ice candidates", (data:any) => {
    console.log("ice candidates", data);
    socket.to(data.to).emit("ice candidates", {
      candidate: data.candidate,
      sender: data.sender,
    });
  });

  socket.on("chat", (data:any) => {
    socket.to(data.room).emit("chat", { sender: data.sender, msg: data.msg });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
};

module.exports = stream;
