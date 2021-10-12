const { fabric } = require("fabric");
const theme = require("../theme");
const Logo = require("./Logo");

class OperatingSystemUI extends fabric.Group {
  constructor(assets, { width = 600, height = 400 }) {
    const taskbarHeight = 34;

    super([], { width, height });

    // Workspace Component
    const workspaceBg = new fabric.Rect({
      width,
      height: height - taskbarHeight,
      fill: theme.palette.desktopBg,
    });
    const questLogo = new Logo(assets["quest-logo"]);
    questLogo.scale(24 / questLogo.getScaledWidth());
    const questDesktopIcon = new fabric.Group([questLogo]);
    const desktopIconsContainer = new fabric.Group([questDesktopIcon], {
      padding: 10,
    })
    const workspace = new fabric.Group([workspaceBg, desktopIconsContainer]);

    // Taskbar Component
    const taskbarBg = new fabric.Rect({
      width,
      height: taskbarHeight,
      fill: theme.palette.darkerGrey,
    });

    const winLogo = fabric.util.object.clone(assets["windows-logo"]);
    winLogo.scale(18 / winLogo.getScaledWidth());
    const windowsBtn = new fabric.Group([winLogo.cloneAsImage()], {
      left: 0,
      width: 42,
      height: taskbarHeight,
    });
    const taskbar = new fabric.Group([taskbarBg, windowsBtn], {
      top: height - taskbarHeight,
    });

    this.addWithUpdate(workspace);
    this.addWithUpdate(taskbar);
  }
}

module.exports = OperatingSystemUI;
