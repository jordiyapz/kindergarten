require("dotenv").config();

const express = require("express");
const { Server } = require("socket.io");

const { app, server } = require("./src/server");
const router = require("./src/router");

const { onSocketConnection } = require("./src/comm");

const PORT = process.env.PORT || 3000;

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(express.static(__dirname + "/public"));
app.use("/client", express.static(__dirname + "/client"));

app.use((req, res) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send(error.message || error);
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

io.on("connection", onSocketConnection);
