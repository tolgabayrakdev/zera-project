import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config";

const app = express();


app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(morgan("dev"));


app.listen(process.env.SERVER_PORT || 1234, () => {
    console.log("Server is rıunning on port 1234");
})
