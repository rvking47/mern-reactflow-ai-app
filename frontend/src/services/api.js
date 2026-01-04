import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-reactflow-ai-app.onrender.com/api",
});


export default api;
