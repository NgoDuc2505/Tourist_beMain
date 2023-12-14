import express from "express";
import cors from"cors";
import rootRoute from "./routes/route.js"

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/api", rootRoute);

app.listen(8080);