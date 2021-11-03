import * as PIXI from "pixi.js";
import setup from "./setup";

setup(PIXI, {
  rendererOpts: {
    view: document.getElementById("main-canvas"),
    backgroundColor: 0x81a2f0,
  },
});
