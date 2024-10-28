import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbconnect.js";
import authRouter from "./Routes/userAuth.js";
import messageRouter from "./Routes/messageRoute.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoute.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send(`server is working`);
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`Listening at ${PORT}`);
});
