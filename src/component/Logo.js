const { fabric } = require("fabric");
const BoxGroup = require("./BoxGroup");

const Logo = fabric.util.createClass(BoxGroup, {
  initialize: function (
    image,
    { imgOpts = {}, size = 28, padding = 2, ...options } = {}
  ) {
    const cloned = fabric.util.object.clone(image);
    cloned.scale((size - padding * 2) / cloned.getScaledWidth());
    cloned.set(imgOpts);
    this.callSuper("initialize", [cloned], {
      padding,
      ...options,
    });
  },
});

module.exports = Logo;
