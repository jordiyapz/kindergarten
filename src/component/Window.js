const { fabric } = require("fabric");
const theme = require("../theme");
const BoxGroup = require("./BoxGroup");
const Logo = require("./Logo");

const actionIconsPath = {
  minimize: "M 0 0 H 7 z",
  maximize: "M 0 0 H 7 V 7 H 0 z",
  close: "M 0 0 L 7 7 z M 0 7 L 7 0 z",
  restore: "M 0 2 H 5 V 7 H 0 z M 2 0 H 7 V 5 H 2 z",
};

const Header = fabric.util.createClass(BoxGroup, {
  initialize: function (
    width,
    { title, iconTexture, headerHeight = 20, actionBtnWidth = 25 }
  ) {
    const actionBtns = Object.values(actionIconsPath).map((iconPath, i) => {
      const icon = new fabric.Path(iconPath, { stroke: "white", fill: null });
      const btn = new BoxGroup([icon], {
        left: i * actionBtnWidth - 1,
        height: headerHeight - 2,
        width: actionBtnWidth,
        justify: "center",
        align: "center",
        padding: 3,
      });
      if (i === 3) {
        btn.left = 1 * actionBtnWidth - 1;
      }
      return btn;
    });

    const actionBtnGroup = new BoxGroup(actionBtns, {
      left: width - actionBtnWidth * 3,
      top: 1,
    });

    const titleText = new fabric.Text(title, theme.font);
    const contentItems = [titleText];
    if (iconTexture) {
      const icon = new Logo(iconTexture, {
        size: 14,
      });
      contentItems.unshift(icon);
    }

    const content = new BoxGroup(contentItems, {
      spacing: 2,
      autoLayout: true,
      padding: { x: 6, y: 0 },
      width: width - actionBtnWidth * 3,
      height: headerHeight,
      align: "center",
    });

    this.callSuper("initialize", [content, actionBtnGroup], {
      width,
      height: headerHeight,
      backgroundColor: theme.palette.darkerGrey,
      align: "center",
    });

    this.actionBtns = actionBtns;
  },
});

const Window = fabric.util.createClass(fabric.Group, {
  initialize: function (
    body,
    { title, iconTexture }, // header
    { headerHeight = 20, actionBtnWidth = 25, ...options }
  ) {
    let { width, height } = body;
    height += 20;

    const header = new Header(width, {
      title,
      iconTexture,
      headerHeight,
      actionBtnWidth,
    });

    body.set({ top: headerHeight, width, height: height - headerHeight });
    this.callSuper("initialize", [header, body], {
      shadow: "rgba(0,0,0,.3) 0 0 5",
      ...options,
    });
    this.maximized = false;
    header.actionBtns[4]?.set("visible", this.maximized);
  },
});

module.exports = Window;
