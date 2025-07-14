import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { connectToSocket } from "./src/controllers/soketManager.js";
import userRoute from "./src/routes/userRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const port = 3000;

app.set("port", process.env.PORT || port);
app.use(cors({
  origin: 'https://video-conferencing-frontend.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // Handle preflight
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const start = async () => {
  const connectionDB = await mongoose.connect(process.env.MONGODB_DATABASE);
  const actualPort = app.get("port");
  server.listen(actualPort, () => {
    console.log(`Server is running on port ${actualPort}`);
  });
// Health check route for Render
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});
};

start();
