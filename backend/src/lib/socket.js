import { Server } from "socket.io";
import http from "http";
import express from "express";
import { config } from "dotenv";

config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// use to store online user
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user Contented", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
