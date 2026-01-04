import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./config/db.js";
import aiRouter from "./routes/aiRoute.js";
import chatRouter from "./routes/chatRouter.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
ConnectDB();
const app = express();

app.use(express.json());
app.use(cors());

//Deployement
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get(/^\/(?!api).*/,(req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
})

app.use("/api/ai", aiRouter);
app.use("/api/chat", chatRouter);


const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
});
