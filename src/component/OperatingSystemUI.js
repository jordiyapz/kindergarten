// const DesktopIconButton = require("./DesktopIconButton");
// const TaskbarIconButton = require("./TaskbarIconButton");
// const TaskbarUI = require("./TaskbarUI");

const { fabric } = require("fabric");

class OperatingSystemUI {
  constructor(width, height) {
    this._canvas = new fabric.StaticCanvas({ width, height });

    // super();
    // this._workspace = new Container();
    // this.addChild(this._workspace);
    // this._screen = { width, height };

    // this._desktop = new Container();
    // this._taskbar = new TaskbarUI({
    //   y: this._screen.height,
    //   width: this._screen.width,
    //   height: 32,
    //   backgroundColor: 0x404040,
    // });
    // this._workspace.addChild(this._desktop, this._taskbar);
  }

  setup(resources) {
    // const questButton = new DesktopIconButton(
    //   40,
    //   resources["quest-icon"].texture,
    //   "Quest",
    //   { padding: 4 }
    // );
    // this._desktop.addChild(questButton);
    // const startButton = new TaskbarIconButton(
    //   this._taskbar._height,
    //   resources["windows-logo"].texture
    // );
    // this._taskbar.addChild(startButton);
  }
}

module.exports = OperatingSystemUI;
