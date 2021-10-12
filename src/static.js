const { fabric } = require("fabric");
const ImageLoader = require("./util/ImageLoader");
const Logo = require("./component/Logo");
const OperatingSystemUI = require("./component/OperatingSystemUI");
const theme = require("./theme");

const canvas = new fabric.Canvas("main-canvas");
canvas.setBackgroundColor("#a0a0a0");
canvas.setWidth(600);
canvas.setHeight(400);

// const Box = new fabric.util.createClass(fabric.Group, {
//   initialize: function (components, { width, heigth, backgroundColor, padding = 0, options }) {
//     const bg = new fabric.Rect({
//       width, height,
//       fill: backgroundColor
//     })
//     this.callSuper([...components], options)
//   },
// });

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
    ],
    { urlPrefix: "http://localhost:9000/assets/" }
  )
  .load()
  .then((assets) => {
    const os = new OperatingSystemUI(assets, {});
    canvas.add(os);
    // const rect = new fabric.Rect({
    //   width: 20,
    //   height: 20,
    //   fill: theme.palette.darkGrey,
    // });
    // const logo = new Logo(assets["quest-logo"], { left: 40 });
    // const box = new fabric.Group([rect, logo], {
    //   padding: 10,
    //   top: 100,
    //   left: 100,
    //   stroke: 2,
    //   borderColor: "black",
    //   hasBorders: true,
    // });
    // canvas.add(box);
  })
  .catch(console.error);
