const { fabric } = require("fabric");
const ImageLoader = require("./util/ImageLoader");
const Logo = require("./component/Logo");
const OperatingSystemUI = require("./component/OperatingSystemUI");
const theme = require("./theme");
const Box = require("./component/Box");

const canvas = new fabric.Canvas("main-canvas", {
  width: 600,
  height: 400,
  backgroundColor: "#a0a0a0",
  selection: false,
  hoverCursor: "none",
});

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
      // top: 150,
      // left: 150,
      padding: 10,
      width: 200,
      // height: 100,
      direction: "row",
      justify: "start",
      align: "center",
      autoLayout: true,
      spacing: 5,
    });

    const box3 = fabric.util.object.clone(box2);
    box3.top = 30;
    console.log(box3 === box2);
    const wrapper = new Box([box2, box3], {
      autoLayout: true,
      direction: "column",
      top: 150,
      left: 150,
    });

    super([bg, wrapper, mid]);
  }
}

const loader = new ImageLoader();
loader
  .add(
    [
      { name: "windows-logo", url: "windows-logo-w-64.png" },
      { name: "quest-logo", url: "quest-logo-64.png" },
      { name: "paint-logo", url: "paint-64.png" },
      { name: "notepad-logo", url: "notepad-logo-64.png" },
    ],
    { urlPrefix: "http://localhost:9000/assets/" }
  )
  .load()
  .then((assets) => {
    const os = new OperatingSystemUI(assets, {});
    canvas.add(os);

    canvas.on("mouse:move", (e) => {
      os.moveCursor(e.pointer);
      canvas.renderAll();
    });
    canvas.on("mouse:up", (e) => {
      os.click();
      canvas.renderAll();
    });
    // const _debugger = new BoxDebugger();
    // canvas.add(_debugger);
  })
  .catch(console.error);
