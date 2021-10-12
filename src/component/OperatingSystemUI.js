const { fabric } = require("fabric");
const theme = require("../theme");
const Box = require("./Box");
const Logo = require("./Logo");

class OperatingSystemUI extends fabric.Group {
  constructor(assets, { width = 600, height = 400 }) {
    const taskbarHeight = 34;

    super([], { width, height, selectable: false });

    const desktopIconBtns = [
      ["quest-logo", "Quest App"],
      ["paint-logo", "Paint"],
    ].map(([logoName, btnName]) => {
      const logo = new Logo(assets[logoName], { size: 24 });
      const text = new fabric.Text(btnName, {
        fontSize: 8,
        fill: "white",
        shadow: `rgba(0,0,0,.9) 0px 1px 1px`,
      });
      const btn = new Box([logo, text], {
        width: 42,
        align: "center",
        autoLayout: true,
        direction: "column",
      });
      return btn;
    });
    const desktopIconContainer = new Box(desktopIconBtns, {
      autoLayout: true,
      spacing: 12,
      padding: 4,
      direction: "column",
    });
    const workspace = new Box([desktopIconContainer], {
      width,
      height: height - taskbarHeight,
      backgroundColor: theme.palette.desktopBg,
    });

    const btns = ["windows-logo", "quest-logo", "paint-logo"].map((name) => {
      const logo = new Logo(assets[name], {
        size: 18,
        // backgroundColor: theme.palette.darkerGrey,
      });
      const btn = new Box([logo], {
        width: 42,
        height: taskbarHeight,
        justify: "center",
        align: "center",
        // backgroundColor: theme.palette.darkGrey,
      });
      return btn;
    });
    const taskbar = new Box(btns, {
      top: height - taskbarHeight,
      width,
      backgroundColor: theme.palette.darkerGrey,
      autoLayout: true,
    });
    this.addWithUpdate(workspace);
    this.addWithUpdate(taskbar);
  }
}

module.exports = OperatingSystemUI;
