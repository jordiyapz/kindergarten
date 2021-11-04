const { fabric } = require("fabric");
const theme = require("../theme");
const BoxGroup = require("./BoxGroup");
const Button = require("./Button");
const Holder = require("./Holder");
const Logo = require("./Logo");

class DesktopIconButton extends Button {}

class Workspace extends Holder {
  constructor(applications, options) {
    super([], { ...options, autoLayout: false });

    const desktopIconBtns = applications.map(
      ({ icon, name }) =>
        new DesktopIconButton(icon, {
          size: 24,
          width: 42,
          align: "center",
          autoLayout: true,
          direction: "column",
          textOptions: {
            text: name,
            shadow: `rgba(0,0,0,.9) 0px 1px 1px`,
          },
        })
    );

    const desktopIconContainer = new Holder(desktopIconBtns, {
      autoLayout: true,
      spacing: 12,
      padding: 4,
      direction: "column",
    });
    desktopIconContainer.setItemsUnselectable(false);

    this.addWithUpdate(desktopIconContainer);
  }
}

module.exports = Workspace;
