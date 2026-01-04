import express from "express";
import saveChat from "../controllers/chatController.js";

const chatRouter=express.Router();

chatRouter.post("/save", saveChat);

export default chatRouter;