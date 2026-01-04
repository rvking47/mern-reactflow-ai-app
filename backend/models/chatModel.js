import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Chat = mongoose.model("chat", chatSchema);

export default Chat;