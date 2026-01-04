import Chat from "../models/chatModel.js";

const saveChat = async (req, res) => {
    try {
        const { prompt, response } = req.body;
        if (!prompt || !response) {
            return res.status(400).json({ message: "Prompt and response required" });
        }

        const chat = await Chat.create({ prompt, response });
        res.status(201).json(chat);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}

export default saveChat;