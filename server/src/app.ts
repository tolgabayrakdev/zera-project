import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config";
import connectDB from "./util/db";


import authRoutes from "./routes/authRoutes";

const app = express();


app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

connectDB();

app.listen(process.env.SERVER_PORT || 1234, () => {
    console.log("Server is rıunning on port 1234");
})
