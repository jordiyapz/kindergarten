const { fabric } = require("fabric");
const theme = require("../theme");
const { useObserver } = require("../util/hooks");
const BoxGroup = require("./BoxGroup");
const Button = require("./Button");
const ButtonBase = require("./ButtonBase");
const Holder = require("./Holder");
const Logo = require("./Logo");

const actionIconsPath = {
  minimize: "M 0 0 H 7 z",
  maximize: "M 0 0 H 7 V 7 H 0 z",
  restore: "M 0 2 H 5 V 7 H 0 z M 2 0 H 7 V 5 H 2 z",
  close: "M 0 0 L 7 7 z M 0 7 L 7 0 z",
};

class ActionButton extends ButtonBase {
  constructor(iconPath, { width, height, ...options }) {
    const icon = new fabric.Path(iconPath, { stroke: "white", fill: null });
    super([icon], {
      height,
      width,
      justify: "center",
      align: "center",
      padding: 3,
      ...options,
    });
  }
}

class Header extends Holder {
  constructor(
    width,
    { title, iconTexture, headerHeight = 20, actionBtnWidth = 25 }
  ) {
    super([], {
      height: headerHeight,
      backgroundColor: theme.palette.darkerGrey,
      align: "center",
      spacing: -1,
    });

    const actionBtns = Object.values(actionIconsPath).map(
      (iconPath, i) =>
        new ActionButton(iconPath, {
          width: actionBtnWidth,
          height: headerHeight - 2,
          left: i > 1 ? -actionBtnWidth : undefined, // shift restore and close button
        })
    );

    const actionBtnGroup = new Holder(actionBtns);
    actionBtnGroup.setItemsUnselectable();

    const titleText = new fabric.Text(title, theme.font);
    const contentItems = [titleText];
    if (iconTexture) {
      const icon = new Logo(iconTexture, { size: 14 });
      contentItems.unshift(icon);
    }

    const content = new BoxGroup(contentItems, {
      spacing: 2,
      autoLayout: true,
      padding: { x: 6, y: 0 },
      width: width - actionBtnGroup.width,
      height: headerHeight,
      align: "center",
    });

    this.actionBtns = actionBtns;

    this.addWithUpdate(content, actionBtnGroup);
    this.setItemsUnselectable();
  }
}

class ApplicationWindow extends Holder {
  constructor(
    { title, iconTexture }, // header content
    { width, height, headerHeight = 20, actionBtnWidth = 25, ...options }
  ) {
    const [state, onStateChange] = useObserver({
      visible: true,
      maximized: false,
    });

    super([], {
      shadow: "rgba(0,0,0,.3) 0 0 5",
      direction: "column",
      spacing: 1,
      width,
      height,
      ...options,
    });
    this.bodyHeight = height - headerHeight;
    this.bodyWidth = width;
    this.state = state;
    this.onStateChange = onStateChange;
    this.header = new Header(width, {
      title,
      iconTexture,
      headerHeight,
      actionBtnWidth,
    });

    this.onStateChange.maximized = (maximized) => {
      this.header.actionBtns[2]?.set("visible", maximized);
      this.header.actionBtns[1]?.set("visible", !maximized);
    };
    state.maximized = false;

    this.onStateChange.visible = (visible) => {
      this.set("visible", visible);
      this.header.set("visible", visible);
      this.body.set("visible", visible);
    };
  }

  _extendState(newStateProperties) {
    const [state, onStateChange] = useObserver({
      ...this.state,
      ...newStateProperties,
    });
    this.onStateChange = Object.assign(onStateChange, this.onStateChange);
    this.state = state;
  }

  compile() {
    this.addWithUpdate(this.header, this.body);
    this.setItemsUnselectable();
  }
}

module.exports = ApplicationWindow;
