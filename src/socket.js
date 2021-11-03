const { Server } = require("socket.io");
const { onSocketConnection } = require("./comm");
const { server } = require("./server");
const sims = require("./simulations");
const { renderCanvas } = require("./util");

const io = new Server(server);
// io.on("connection", onSocketConnection);

const simulationNs = io.of(/^\/sim-\w{8}$/);

simulationNs.use((socket, next) => {
  const id = socket.nsp.name.split("-")[1];
  if (!sims[id]) {
    // socket.send(`Sim ${id} not exist`);
    const error = new Error(`Sim ${id} not exist`);
    // error.data = {  }
    next(error);
    return;
  }
  next();
});

simulationNs.on("connection", (socket) => {
  console.log(`${socket.id} connected to ${socket.nsp.name}`);

  const id = socket.nsp.name.split("-")[1];
  const sim = sims[id];

  socket.on("sim:init", () => {
    renderCanvas(sim.canvas).then((dataUri) => {
      socket.nsp.emit("sim:render", dataUri, 0);
    });
  });

  socket.on("sim:move", (movement) => {
    sim.moveCursor(movement);
    renderCanvas(sim.canvas).then((dataUri) => {
      socket.nsp.emit("sim:render", dataUri, 0);
    });
  });

  socket.on("sim:action", async (actions) => {
    /**
     * Action is an object of command in format:
     * (x: move_cursor_x, y: move_cursor_y, down: cursor_down)
     */
    try {
      const { x, y } = actions;
      sim.moveCursor({ x, y });
  
      const dataUri = await renderCanvas(sim.canvas)
      socket.nsp.emit("sim:render", dataUri, 0);
    } catch (error) {
      console.error(error.message || error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(socket.id + " has been disconnected due to: " + reason);
  });
});

const viewerNs = io.of("/viewer");

viewerNs.on("connection", (socket) => {
  console.log(`Viewer ${socket.id} has joined.`);
});

module.exports = { io };
