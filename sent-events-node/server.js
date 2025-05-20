const express = require("express");
const cors = require("cors");
const fs = require("fs");
const chokidar = require("chokidar");

const app = express();
app.use(cors({
    origin: '*', // Puoi specificare un dominio invece di '*'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const watcher = chokidar.watch("file.txt");

    watcher.on("change", () => {
        const content = fs.readFileSync("file.txt", "utf-8");
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
    });

    req.on("close", () => {
        watcher.close();
    });
});

app.listen(3000, () => console.log("SSE server in ascolto su http://localhost:3000"));