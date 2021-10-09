const { fabric } = require("fabric");
const IconButton = require("./component/IconButton");
const ImageLoader = require("./component/ImageLoader");
// const OperatingSystemUI = require("./component/OperatingSystemUI");

const DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};

const imageLoader = new ImageLoader().add(
  [
    {
      name: "windows-logo",
      url: "windows-logo-w-64.png",
      options: { scaleX: 0.5, scaleY: 0.5 },
    },
  ],
  { urlPrefix: process.env.BASE_URL + "/assets/" }
);

const createSim = async () => {
  let images;
  try {
    images = await imageLoader.load();
  } catch (error) {
    console.error("Image loading error: " + error.message || error);
    return Promise.reject(error);
  }

  const canvasSize = {
    width: 600,
    height: 400,
  };
  const canvas = new fabric.StaticCanvas(null, {
    ...canvasSize,
    backgroundColor: "#AAAAFA",
  });

  const taskbarOptions = {
    height: 32,
  };

  const logo = images["windows-logo"];
  logo.set("padding", 4);

  const windowsBtn = new IconButton(logo, {
    width: taskbarOptions.height,
    height: taskbarOptions.height,
    padding: 4,
  });

  const taskbarBg = new fabric.Rect({
    width: canvasSize.width,
    height: taskbarOptions.height,
    fill: "#404040",
  });

  const taskbar = new fabric.Group([taskbarBg, windowsBtn], {
    top: canvasSize.height - taskbarOptions.height,
  });

  const cursor = new fabric.Rect({
    left: 20,
    top: 20,
    width: 20,
    height: 20,
    fill: "green",
  });

  canvas.add(taskbar);
  canvas.add(windowsBtn);
  canvas.add(cursor);

  function move(direction, options) {
    const { value, ...opts } = options;
    switch (direction) {
      case DIRECTION.UP:
        cursor.animate("top", `-=${value}`, opts);
        break;
      case DIRECTION.DOWN:
        cursor.animate("top", `+=${value}`, opts);
        break;
      case DIRECTION.LEFT:
        cursor.animate("left", `-=${value}`, opts);
        break;
      case DIRECTION.RIGHT:
        cursor.animate("left", `+=${value}`, opts);
        break;
    }
  }
  return { canvas, move };
};

module.exports = { createSim };
