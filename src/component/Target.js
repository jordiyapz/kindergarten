const Holder = require("./Holder");
const { fabric } = require("fabric");
const { useObserver } = require("../util/hooks");

class Target extends Holder {
  constructor({ pos, visible, radius = 7, color = "red" }) {
    const innerCircle = new fabric.Circle({
      radius: radius - 4,
      fill: null,
      strokeWidth: 2,
      stroke: color,
      left: pos.x - radius + 4,
      top: pos.y - radius + 4,
    });

    const outerCircle = new fabric.Circle({
      radius: radius,
      fill: null,
      strokeWidth: 2,
      stroke: color,
      left: pos.x - radius,
      top: pos.y - radius,
    });

    super([outerCircle, innerCircle], {
      autoLayout: false,
      visible,
      selectable: false,
    });

    const [state, onStateChange] = useObserver({ pos, color, radius });
    this.state = state;

    onStateChange.radius = (r) => {
      innerCircle.set("radius", r - 4);
      outerCircle.set("radius", r);
    };

    onStateChange.pos = ({ x, y }) => {
      innerCircle.set({
        left: x - innerCircle.radius,
        top: y - innerCircle.radius,
      });
      outerCircle.set({
        left: x - outerCircle.radius,
        top: y - outerCircle.radius,
      });
    };

    onStateChange.color = (color) => {
      innerCircle.set("stroke", color);
      outerCircle.set("stroke", color);
    };
  }
}

module.exports = Target;
