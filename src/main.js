const { fabric } = require("fabric");
const ImageLoader = require("./util/ImageLoader");
const OperatingSystemUI = require("./component/OperatingSystemUI");
const fs = require("fs");

const imageLoader = new ImageLoader();

const fontPath = __dirname + "/assets/fonts/";
const fontManifest = {
  Roboto: [
    {
      name: "Roboto-Regular.ttf",
      weight: "regular",
      style: "normal",
    },
    {
      name: "Roboto-Italic.ttf",
      weight: "regular",
      style: "italic",
    },
  ],
};

Object.entries(fontManifest).forEach(([family, manifests]) => {
  manifests.forEach(({ name, ...manifest }) => {
    fabric.nodeCanvas.registerFont(fontPath + `${family}/${name}`, {
      family,
      ...manifest,
    });
  });
});

imageLoader
  .add(
    [
      { name: "windows-logo", url: "windows-logo-w-64.png" },
      { name: "quest-logo", url: "quest-logo-64.png" },
      { name: "paint-logo", url: "paint-64.png" },
      { name: "notepad-logo", url: "notepad-logo-64.png" },
    ],
    { urlPrefix: process.env.BASE_URL + "/assets/" }
  )
  .load();

const createSim = async () => {
  const canvasOptions = {
    width: 600,
    height: 400,
    backgroundColor: "#a0a0a0",
    selection: false,
    hoverCursor: "none",
    renderOnAddRemove: false,
  };

  let assets;
  try {
    assets = await imageLoader.load();
  } catch (error) {
    console.error("Image loading error: " + error.message || error);
    return Promise.reject(error);
  }

  try {
    const canvas = new fabric.Canvas(null, { ...canvasOptions });
    const os = new OperatingSystemUI(assets, {});
    canvas.add(os);
    canvas.renderAll();

    const actions = {
      moveCursor: ({ x, y }) => {
        const cursor = os.getCursorCoord();
        const movement = new fabric.Point(x, y);
        const target = cursor.add(movement);
        os.moveCursor(target);
      },
    };
    return {
      canvas,
      ...actions,
    };
  } catch (error) {
    console.error("Something went wrong: " + error.message || error);
    return Promise.reject(error);
  }
};

module.exports = { createSim };
