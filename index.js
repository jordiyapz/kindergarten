require("dotenv").config();

const express = require("express");
const { Server } = require("socket.io");

const { app, server } = require("./src/server");
const router = require("./src/router");
const sims = require("./src/simulations");
const { createSim } = require("./src/main");
const { renderCanvas } = require("./src/util");

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

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  createSim()
    .then((sim) => {
      sims[socket.id] = sim;
      renderCanvas(socket, sim);
    })
    .catch((error) => {
      console.error(error);
      socket.send(error);
    });

  socket.on("move", (direction) => {
    sims[socket.id].move(direction, {
      value: 20,
      duration: 1,
      onComplete: () => {
        renderCanvas(socket, sims[socket.id]);
      },
    });
  });
  socket.on("message", (msg) => {
    console.log(msg);
  });
  socket.on("disconnecting", (reason) => {
    console.log(socket.id + " is disconnecting: " + reason);
    if (sims[socket.id]) {
      delete sims[socket.id];
    }
  });
  socket.on("disconnected", (reason) => {
    console.log(`Client ${socket.id} got disconnected: ${reason}`);
  });
});
