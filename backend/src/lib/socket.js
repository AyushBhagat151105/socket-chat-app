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

io.on("connection", (socket) => {
  console.log("A user Contented", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

export { io, app, server };
