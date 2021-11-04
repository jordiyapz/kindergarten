const { fabric } = require("fabric");
const theme = require("../theme");
const { constraintNum } = require("../util");
const BoxGroup = require("./BoxGroup");
const Holder = require("./Holder");
const Logo = require("./Logo");
const StartMenu = require("./StartMenu");
const Taskbar = require("./Taskbar");
const Window = require("./Window");
const Workspace = require("./Workspace");

class OperatingSystemUI extends Holder {
  constructor(assets, { width = 600, height = 400 }) {
    const taskbarHeight = 34;
    const startMenuProp = {
      width: 160,
      height: 240,
    };
    const winIcon = assets["windows-logo"];
    const applications = [
      { iconName: "quest-logo", name: "Quest App" },
      { iconName: "paint-logo", name: "Paint" },
      { iconName: "notepad-logo", name: "Notepad" },
    ].map((property) => ({ ...property, icon: assets[property.iconName] }));

    super([], { width, height, selectable: false, autoLayout: false });

    const workspace = new Workspace(applications, {
      width,
      height: height - taskbarHeight,
      backgroundColor: theme.palette.desktopBg,
    });

    this._taskbar = new Taskbar(applications, winIcon, {
      top: height - taskbarHeight,
      width,
      height: taskbarHeight,
      backgroundColor: theme.palette.darkerGrey,
    });

    this._startMenu = new StartMenu(applications, {
      ...startMenuProp,
      backgroundColor: theme.palette.darkGrey,
      autoLayout: true,
      direction: "column",
      top: height - (startMenuProp.height + taskbarHeight) + 1,
      visible: false,
      shadow: "rgba(0,0,0,.5) 0 0 4",
    });

    this._cursor = new fabric.Path(
      "M15,6l24,22.4l-11.6,1l6.7,14.6L29.7,46l-6.4-14.8L15,39L15,6",
      {
        stroke: "black",
        fill: "white",
        selectable: false,
        left: width / 2,
        top: height / 2,
      }
    );
    this._cursor.scale(10 / this._cursor.width);

    // notepad
    const notepadBodyContent = new fabric.Text("Lorem ipsum dolor sit amet!", {
      ...theme.font,
      fill: "black",
    });
    const notepadBody = new BoxGroup([notepadBodyContent], {
      backgroundColor: "white",
      width: 320,
      height: 220,
      padding: 4,
    });
    const notepadWindow = new Window(
      notepadBody,
      { title: "Notepad", iconTexture: assets["notepad-logo"] },
      { top: 80, left: 120, visible: false }
    );

    // quest
    const questBodyContent = new fabric.Text("Move the cursor to red circle", {
      ...theme.font,
      fill: "black",
    });
    const questBody = new BoxGroup([questBodyContent], {
      width: 151,
      height: 82,
      padding: 4,
      backgroundColor: theme.palette.stickyNoteYellow,
    });
    const questWindow = new Window(
      questBody,
      { title: "Quest App", iconTexture: assets["quest-logo"] },
      { left: 449, top: 0 }
    );

    workspace.addWithUpdate(notepadWindow);
    workspace.addWithUpdate(questWindow);

    this._taskbar.item(0).onClick((e) => {
      this._startMenu.state.visible = !this._startMenu.visible;
    });
    this.on("mouseup", (e) => {
      if (this._startMenu.state.visible) {
        this._startMenu.state.visible = false;
      }
    });

    this.add(workspace);
    this.add(this._startMenu);
    this.add(this._taskbar);
    this.add(this._cursor);
    this.bindItems();
    this.setItemsUnselectable(false);
  }

  getCursorCoord() {
    const { left, top } = this._cursor;
    return new fabric.Point(left + this.width / 2, top + this.height / 2);
  }

  /**
   * Move cursor to position
   * @param {{x: number, y: number}} position
   */
  moveCursor({ x, y }) {
    this._cursor.set({
      left: constraintNum(x, { max: this.width }),
      top: constraintNum(y, { max: this.height }),
    });
  }
}

module.exports = OperatingSystemUI;
