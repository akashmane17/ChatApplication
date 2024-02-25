import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 5001;

dotenv.config();

app.use(express.json()); // to parse incodmin requests with JSON payloads
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   // root route http://localhost:5000
//   res.send("Server is working...");
// });

app.use(notFound);
app.use(errorHandler);
server.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
