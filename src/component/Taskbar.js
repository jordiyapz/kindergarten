const { fabric } = require("fabric");
const Holder = require("./Holder");
const Logo = require("./Logo");
const BoxGroup = require("./BoxGroup");

class Taskbar extends Holder {
  constructor(applications, windowsIcon, options) {
    super([], { ...options, autoLayout: true });

    this.buttons = [windowsIcon, ...applications.map((app) => app.icon)].map(
      (icon) => {
        const logo = new Logo(icon, { size: 18 });
        const btn = new BoxGroup([logo], {
          width: 42,
          height: options.height,
          justify: "center",
          align: "center",
        });
        return btn;
      }
    );

    this.addWithUpdate(...this.buttons);
  }
}

module.exports = Taskbar;
