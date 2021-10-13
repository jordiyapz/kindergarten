const { fabric } = require("fabric");
const Box = require("../component/Box");

function boxDebugRunner(canvas, assets) {
  try {
    const bg = new fabric.Rect({
      top: 20,
      left: 20,
      fill: "black",
    });

    const { top, left } = bg;
    bg.set({
      height: 400 - 2 * top - 34,
      width: 600 - 2 * left,
    });
    const { width, height } = bg;

    const lb1 = new Box(
      new fabric.Rect({
        left: 40,
        top: 20,
        width: 30,
        height: 40,
        fill: "green",
      }),
      {
        autoLayout: false,
        bgColor: "red",
        padding: 10,
      }
    );
    const bLeft = new Box(
      [
        new fabric.Rect({
          left: 60,
          top: 100,
          width: 40,
          height: 30,
          fill: "blue",
        }),
        lb1,
      ],
      {
        width: 80,
        bgColor: "yellow",
        padding: 6,
        autoLayout: false,
      }
    );

    const bRight1 = new Box(
      [0, 0, 0].map(
        (_, i) =>
          new fabric.Rect({
            width: 20 * (i + 1),
            height: 20,
            fill: "green",
          })
      ),
      {
        padding: 7,
        direction: "column",
        stroke: "red",
        strokeWidth: 1,
        align: "center",
      }
    );

    const bRight2 = new Box(
      [0, 0, 0].map(
        (_, i) =>
          new fabric.Rect({
            width: 20,
            height: 20 * (i + 1),
            fill: "green",
          })
      ),
      {
        padding: 7,
        align: "center",
        stroke: "red",
        strokeWidth: 1,
      }
    );

    const bMiddle = new Box([bRight1, bRight2], {
      justify: "center",
      direction: "column",
      padding: 7,
      spacing: 6,
      bgColor: "aquamarine",
    });

    const rects = Array(13)
      .fill(0)
      .map((_, i, arr) => {
        const half = Math.floor(arr.length / 2);
        const shift = Math.abs(i - half);
        return new fabric.Rect({
          height: 10,
          width: 10 * (arr.length - shift * 2),
          fill: "yellow",
          stroke: "black",
        });
      });

    const bRight = new Box(rects, {
      width: 160,
      height: 160,
      padding: 10,
      direction: "column",
      align: "center",
      justify: "center",
      stroke: "azure",
    });

    const container = new Box([bLeft, bMiddle, bRight], {
      top,
      left,
      width: width - 16,
      height: height - 16,
      spacing: 4,
      padding: 8,
      justify: "center",
    });

    canvas.add(bg);
    canvas.add(container);
    canvas.renderAll();
  } catch (error) {
    console.error(error);
  }
}

module.exports = { boxDebugRunner };
