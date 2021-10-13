const { fabric } = require("fabric");
const theme = require("../theme");
const BoxGroup = require("./BoxGroup");
const Logo = require("./Logo");
const Window = require("./Window");

class OperatingSystemUI extends fabric.Group {
  constructor(assets, { width = 600, height = 400 }) {
    const taskbarHeight = 34;
    const startMenuProp = {
      width: 160,
      height: 240,
    };

    const applications = [
      { icon: "quest-logo", name: "Quest App" },
      { icon: "paint-logo", name: "Paint" },
      { icon: "notepad-logo", name: "Notepad" },
    ];

    super([], { width, height, selectable: false });

    const desktopIconBtns = applications.map(({ icon, name }) => {
      const logo = new Logo(assets[icon], { size: 24 });
      const text = new fabric.Text(name, {
        ...theme.font,
        shadow: `rgba(0,0,0,.9) 0px 1px 1px`,
      });
      const btn = new BoxGroup([logo, text], {
        width: 42,
        align: "center",
        autoLayout: true,
        direction: "column",
      });
      return btn;
    });
    const desktopIconContainer = new BoxGroup(desktopIconBtns, {
      autoLayout: true,
      spacing: 12,
      padding: 4,
      direction: "column",
    });
    const workspace = new BoxGroup([desktopIconContainer], {
      width,
      height: height - taskbarHeight,
      backgroundColor: theme.palette.desktopBg,
    });

    const taskbarBtns = [
      "windows-logo",
      ...applications.map(({ icon }) => icon),
    ].map((icon) => {
      const logo = new Logo(assets[icon], {
        size: 18,
      });
      const btn = new BoxGroup([logo], {
        width: 42,
        height: taskbarHeight,
        justify: "center",
        align: "center",
      });
      return btn;
    });
    this._taskbar = new BoxGroup(taskbarBtns, {
      top: height - taskbarHeight,
      width,
      backgroundColor: theme.palette.darkerGrey,
      autoLayout: true,
    });

    const startMenuItems = applications.map((app) => {
      const icon = new Logo(assets[app.icon], { size: 17 });
      const label = new fabric.Text(app.name, theme.font);
      const btn = new BoxGroup([icon, label], {
        autoLayout: true,
        padding: 6,
        spacing: 8,
        align: "center",
        width: startMenuProp.width,
      });
      return btn;
    });
    this._startMenu = new BoxGroup(startMenuItems, {
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
      { top: 80, left: 120 }
    );

    // quest
    const questBodyContent = new fabric.Text("Lorem ipsum dolor sit amet!", {
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
      { left: 324, top: 193 }
    );

    workspace.addWithUpdate(notepadWindow);
    workspace.addWithUpdate(questWindow);

    this.addWithUpdate(workspace);
    this.addWithUpdate(this._startMenu);
    this.addWithUpdate(this._taskbar);
    this.addWithUpdate(this._cursor);
  }

  moveCursor({ x, y }) {
    this._cursor.set({ top: y - this.height / 2, left: x - this.width / 2 });
  }

  click() {
    if (this._cursor.intersectsWithObject(this._taskbar, false, true)) {
      this._startMenu.set("visible", !this._startMenu.visible);
    }
  }
}

module.exports = OperatingSystemUI;
