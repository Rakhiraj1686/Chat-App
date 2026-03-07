const OnlineUsers = {};

const WebSocket = (io) => {
  console.log("🔌 Socket Connected");

  io.on("connection", (socket) => {
    socket.on("createPath", (userID) => {
      OnlineUsers[userID] = socket.id;
      console.log("OnlineUsers", OnlineUsers);
    });
    socket.on("destroyPath", (userID) => {
      delete OnlineUsers[userID];
      console.log("OnlineUsers", OnlineUsers);
    });
  });
};

export default WebSocket;