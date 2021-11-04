const { fabric } = require("fabric");
const theme = require("../theme");
const { useObserver } = require("../util/hooks");
const BoxGroup = require("./BoxGroup");
const ButtonBase = require("./ButtonBase");
const Holder = require("./Holder");
const Logo = require("./Logo");

class StartMenuButton extends ButtonBase {
  constructor(app, { width, ...options }) {
    const icon = new Logo(app.icon, { size: 17 });
    const label = new fabric.Text(app.name, theme.font);
    super([icon, label], {
      ...options,
      autoLayout: true,
      padding: 6,
      spacing: 8,
      align: "center",
      width,
    });
  }
}

class StartMenu extends Holder {
  constructor(applications, options) {
    const [menuState, onMenuStateChange] = useObserver({ visible: false });

    const startMenuItems = applications.map(
      (app) =>
        new StartMenuButton(app, {
          width: options.width,
          visible: menuState.visible,
        })
    );

    super(startMenuItems, { ...options, ...menuState });
    this.setItemsUnselectable();

    this.state = menuState;

    onMenuStateChange.visible = (state) => {
      this.set("visible", state);
      startMenuItems.forEach((btn) => btn.set("visible", state));
    };
  }
}

module.exports = StartMenu;
