import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbconnect.js";
import authRouter from "./Routes/userAuth.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

// middleware
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send(`server is working`);
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`Listening at ${PORT}`);
});
