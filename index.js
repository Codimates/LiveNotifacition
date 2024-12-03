import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import {
  registrenotify,
  getnotifacition,
  getviewedsignal,
} from "./sockethandler/RegisterNotify.js";

// Load environment variables
dotenv.config();
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`A user connected : ${socket.id}`);

  registrenotify(socket);
  getnotifacition(io);
  getviewedsignal(socket);

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });
});

app.use(cors());
app.use(express.json());

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
