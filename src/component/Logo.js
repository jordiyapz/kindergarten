const { fabric } = require("fabric");
const BoxGroup = require("./BoxGroup");

const Logo = fabric.util.createClass(BoxGroup, {
  initialize: function (
    image,
    { imgOpts = {}, size = 28, padding = 2, ...options } = {}
  ) {
    const clonnedIcon = fabric.util.object.clone(image);
    clonnedIcon.scale((size - padding * 2) / clonnedIcon.getScaledWidth());
    clonnedIcon.set(imgOpts);
    this.callSuper("initialize", [clonnedIcon], {
      padding,
      ...options,
    });
    this._icon = image;
  },
  clone: function ()  {
    return fabric.util.object.clone(this)
  }
});

module.exports = Logo;
