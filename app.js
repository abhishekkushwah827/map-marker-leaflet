const express = require('express')
const app = express();
const http = require('http');
const path = require('path');
const { emit } = require('process');
const scoketio = require('socket.io');

const server = http.createServer(app);

const io = scoketio(server);

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

const port = 3000;

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    })
    console.log("connected")
})

app.get('/', (req, res) => {
    res.render("index");
    // res.send("Hello world");
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;

// { "version": 2, "rewrites": [{ "source": "/(.*)", "destination": "/api" }] }
// "rewrites": [{ "source": "/(.*)", "destination": "/api" }]