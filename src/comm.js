const sims = require("./simulations");
const { createSim } = require("./main");
const { renderCanvas } = require("./util");

const onSocketConnection = (socket) => {
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

  socket.on("move", (movement) => {
    sims[socket.id].moveCursor(movement);
    renderCanvas(socket, sims[socket.id]);
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
};

module.exports = { onSocketConnection };
