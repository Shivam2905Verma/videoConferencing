import { Server } from "socket.io";

let connection = {};
let messages = {};
let timeOnLine = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-call", (path) => {
      if (!connection[path]) connection[path] = [];
      connection[path].push(socket.id);
      timeOnLine[socket.id] = new Date();

      // Inform everyone in the room
      connection[path].forEach((id) => {
        io.to(id).emit("user-joined", socket.id, connection[path]);
      });

      // Send old messages if any
      if (messages[path]) {
        messages[path].forEach((msg) => {
          io.to(socket.id).emit(
            "chat-message",
            msg.data,
            msg.sender,
            msg["socket-id-sender"]
          );
        });
      }

      // Handle signaling
      socket.on("signal", (toId, message) => {
        io.to(toId).emit("signal", socket.id, message);
      });

      // Handle chat
      socket.on("chat-message", (data, sender) => {
        const room = Object.entries(connection).find(([_, users]) =>
          users.includes(socket.id)
        )?.[0];

        if (room) {
          if (!messages[room]) messages[room] = [];

          messages[room].push({
            data,
            sender,
            "socket-id-sender": socket.id,
          });

          console.log("message", room, ":", sender, data);

          connection[room].forEach((userId) => {
            io.to(userId).emit("chat-message", data, sender, socket.id);
          });
        }
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        const room = Object.entries(connection).find(([_, users]) =>
          users.includes(socket.id)
        )?.[0];

        if (room) {
          const userList = connection[room];

          // Remove user
          connection[room] = userList.filter((id) => id !== socket.id);

          // Notify others
          connection[room].forEach((userId) => {
            io.to(userId).emit("user-left", socket.id);
          });

          // Clean up if room empty
          if (connection[room].length === 0) {
            delete connection[room];
            delete messages[room];
          }
        }

        delete timeOnLine[socket.id];
        console.log("User disconnected:", socket.id);
      });
    });
  });

  return io;
};

export { connectToSocket };
