const express = require("express");
const router = new express.Router();
const sims = require("./simulations");


router.get(
  "/canvases/:id",
  (req, res, next) => {
    const id = (req.params.id);
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

// router.get("/sims/:id", (req, res, next) => {
//   res.sendFile();
// });

module.exports = router;
