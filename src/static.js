const { fabric } = require("fabric");
const ImageLoader = require("./util/ImageLoader");
const Logo = require("./component/Logo");
const OperatingSystemUI = require("./component/OperatingSystemUI");
const theme = require("./theme");
const Box = require("./component/Box");

const canvas = new fabric.Canvas("main-canvas");
canvas.setBackgroundColor("#a0a0a0");
canvas.setWidth(600);
canvas.setHeight(400);

class BoxDebugger extends fabric.Group {
  constructor() {
    const bg = new fabric.Rect({
      top: 150,
      left: 150,
      width: 200,
      height: 150,
      fill: "#000000",
    });

    const mid = new fabric.Rect({
      top: bg.top - 40,
      left: bg.left + bg.width / 2,
      width: 40,
      height: 40,
      fill: "yellow",
    });

    const rect1 = new fabric.Rect({
      width: 30,
      height: 30,
      fill: "green",
    });
    const rect2 = new fabric.Rect({
      width: 20,
      height: 20,
      fill: "red",
    });
    const text1 = new fabric.Text("Lorem Ipsum!", {
      fontSize: 12,
      fill: "yellow",
      stroke: 0,
    });

    const box2 = new Box([rect1, rect2, text1], {
      backgroundColor: "blue",
      top: 150,
      left: 150,
      padding: 10,
      width: 200,
      height: 100,
      direction: "column",
      justify: "center",
      align: "center",
      autoLayout: true,
      spacing: 5,
    });

    super([bg, box2, mid]);
  }
}

const loader = new ImageLoader();
loader
  .add(
    [
      {
        name: "windows-logo",
        url: "windows-logo-w-64.png",
      },
      {
        name: "quest-logo",
        url: "quest-logo-64.png",
      },
      {
        name: "paint-logo",
        url: "paint-64.png",
      },
    ],
    { urlPrefix: "http://localhost:9000/assets/" }
  )
  .load()
  .then((assets) => {
    const os = new OperatingSystemUI(assets, {});
    canvas.add(os);
    // const _debugger = new BoxDebugger();
    // canvas.add(_debugger);
  })
  .catch(console.error);
