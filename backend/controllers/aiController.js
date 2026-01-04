import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const askAI = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" })
        }

        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mistral-7b-instruct:free",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:7002",
                    "X-Title": "MERN AI Flow App",
                }
            }
        );

        const answer = response.data.choices[0].message.content;

        res.status(200).json({ answer });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}
export default askAI;