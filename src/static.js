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
  renderOnAddRemove: false,
});

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

    const onCursorMove = ({ x, y }) => {
      os.moveCursor({ x, y });
      canvas.renderAll();
    };

    const onCursorClick = () => {
      os.click();
      canvas.renderAll();
    };

    canvas.on("mouse:move", (e) => {
      onCursorMove(e.pointer);
    });
    canvas.on("mouse:up", (e) => {
      onCursorClick();
    });

    // const _debugger = new BoxDebugger();
    // canvas.add(_debugger);

    canvas.renderAll();
  })
  .catch(console.error);
