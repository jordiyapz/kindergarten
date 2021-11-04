const { fabric } = require("fabric");
const theme = require("../theme");
const { constraintNum } = require("../util");
const Holder = require("./Holder");
const StartMenu = require("./StartMenu");
const Taskbar = require("./Taskbar");
const Workspace = require("./Workspace");
const NotepadWindow = require("./NotepadWindow");
const QuestWindow = require("./QuestWindow");
const { useObserver } = require("../util/hooks");
const Target = require("./Target");

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

    // Quest App logic
    const [questState, onQuestStateChange] = useObserver({
      stage: 0,
      target: {
        pos: {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
        },
        visible: true,
        radius: 16,
        color: "red",
      },
      success: 0,
    });
    // End of Quest App logic

    super([], { width, height, selectable: false, autoLayout: false });
    this.questState = questState;

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
        strokeWidth: 1,
        fill: "white",
        selectable: false,
        left: width / 2,
        top: height / 2,
      }
    );
    this._cursor.scale(10 / this._cursor.width);

    // notepad
    const notepadWindow = new NotepadWindow(assets["notepad-logo"], {
      width: 300,
      height: 220,
      top: 80,
      left: 120,
    });
    notepadWindow.state.visible = false;

    // quest
    this.questWindow = new QuestWindow(assets["quest-logo"], {
      left: 450,
      top: 276,
      width: 150,
      height: 90,
    });

    const target = new Target({ ...questState.target });

    this._taskbar.item(0).onClick((e) => {
      this._startMenu.state.visible = !this._startMenu.visible;

      if (this._startMenu.visible) {
        this.questWindow.state.text = "Close the menu";
      } else {
        this.questWindow.state.text = "Move the cursor to red circle";
      }
    });

    workspace.addWithUpdate(notepadWindow, this.questWindow);

    this.add(workspace);
    this.add(this._startMenu);
    this.add(this._taskbar);
    this.add(target);
    this.add(this._cursor);
    this.bindItems();
    this.setItemsUnselectable(false);

    onQuestStateChange.target = (newTarget) => {
      target.state.color = newTarget.color;
      target.state.pos = newTarget.pos;
      target.state.radius = newTarget.radius;
    };
    onQuestStateChange.success = () => {};
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
    const questState = this.questState;
    this._cursor.set({
      left: constraintNum(x, { max: this.width }),
      top: constraintNum(y, { max: this.height }),
    });
    if (questState.stage == 0) {
      const cursor = new fabric.Point(this._cursor.left, this._cursor.top);
      const pos = questState.target.pos;
      const dist = cursor.distanceFrom(new fabric.Point(pos.x, pos.y));
      if (dist < questState.target.radius) {
        questState.target = {
          ...questState.target,
          pos: {
            x: Math.floor(Math.random() * this.width),
            y: Math.floor(Math.random() * this.height),
          },
          radius: Math.floor(Math.random() * 20 + 16),
        };
        questState.success = questState.success + 1;
        this.questWindow.state.text = `Move the cursor to red circle!\nSuccess count: ${questState.success}`;
      }
    }
  }
}

module.exports = OperatingSystemUI;
