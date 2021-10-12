const { fabric } = require("fabric");

const Logo = fabric.util.createClass(fabric.Group, {
  initialize: function (
    image,
    { imgOpts = {}, size = 24, padding = 4, ...options } = {}
  ) {
    const cloned = fabric.util.object.clone(image);
    cloned.scale(size / cloned.getScaledWidth());
    cloned.set({ top: padding, left: padding, ...imgOpts });
    this.callSuper("initialize", [cloned], options);
  },
});

module.exports = Logo;
