const express = require("express");
const router = new express.Router();
const sims = require("./simulations");
const { v4: uuidv4 } = require("uuid");
const { createSim } = require("./main");
const { io } = require("./socket");

router.get("/sims", async (req, res, next) => {
  return res.status(200).send(Object.keys(sims));
});

router.post("/sims", async (req, res, next) => {
  let id = null;
  do {
    const rawId = uuidv4();
    id = rawId.slice(0, 8);
  } while (Object.keys(sims).find((key) => key === id));

  try {
    const newSim = await createSim();
    sims[id] = newSim;
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }

  io.of("/viewer").emit("sim:new", id);
  return res.status(200).send({ id });
});

router.delete("/sims/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!sims[id]) {
    return res.status(404).send({ error: "NotFound" });
  }

  delete sims[id];
  io.of(`/sim-${id}`).emit("sim:remove");

  return res.status(204).send({});
});

router.delete("/sims", async (req, res, next) => {
  Object.keys(sims).forEach((id) => {
    delete sims[id];
  });
  io.of("/viewer").emit("sim:remove:all");
  return res.status(204).send({});
});

router.get(
  "/canvases/:id",
  (req, res, next) => {
    const id = req.params.id;
    if (!sims[id]) {
      return res.status(404).send({ error: "simulation not exist" });
    }
    req.params.id = id;
    next();
  },
  (req, res, next) => {
    const { id } = req.params;
    try {
      const sim = sims[id];
      sim.canvas.renderAll();

      const stream = sim.canvas.createPNGStream();
      stream.on("data", function (chunk) {
        res.write(chunk);
      });
      stream.on("end", function () {
        res.end();
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
