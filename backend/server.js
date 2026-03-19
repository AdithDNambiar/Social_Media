const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// 🔥 STORE ONLINE USERS
let users = {};

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  // JOIN USER
  socket.on("join", (userId) => {
    users[userId] = socket.id;
    console.log("Users:", users);
  });

  // SEND MESSAGE REALTIME
  socket.on("sendMessage", ({ sender, receiver, text }) => {

    const receiverSocket = users[receiver];

    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", {
        sender,
        text,
        createdAt: new Date()
      });
    }

  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});