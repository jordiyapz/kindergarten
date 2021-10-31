const { fabric } = require("fabric");
const { parsePoint, translate } = require(".");
const Box = require("../component/Box");
const Holder = require("../component/Holder");

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

function boxEventDebugRunner(canvas) {
  const options = {
    fill: "black",
    left: 20,
    top: 20,
    selectable: false,
  };
  options.width = 600 - options.left * 2;
  options.height = 400 - options.top * 2 - 34;
  const bg = new fabric.Rect(options);
  const button1 = new fabric.Rect({
    ...options,
    width: 140,
    height: 140,
    fill: "blue",
  });

  const buttons = [0, 0, 0, 0].map(() => {
    const btn = new fabric.Rect({
      ...options,
      width: 70,
      height: 50,
      fill: "blue",
    });
    btn.on("lorem", (e) => {
      console.log("lorem");
      console.log(e);
    });
    return btn;
  });
  const wrapper = new Box(buttons, {
    left: button1.left + button1.width,
    selectable: false,
    direction: "column",
    spacing: 10,
  });

  button1.on("mouseup", (e) => {
    console.log("mouseup");
    wrapper.abc();
  });

  wrapper.on("mouseover", (e) => {
    console.log("mouseover");
  });
  wrapper.on("mouseup", (e) => {
    console.log(e);
    // .fire("lorem", { target: button2 });
  });

  canvas.add(bg, button1, wrapper);
  canvas.hoverCursor = "cursor";
  canvas.renderAll();
}

function anotherBox(canvas) {
  let p = fabric.util.transformPoint(
    { x: 300, y: 200 },
    canvas.viewportTransform
  );
  const bg = new fabric.Rect({
    left: p.x - 175,
    top: p.y - 150,
    width: 350,
    height: 300,
    selectable: false,
  });

  let zero = fabric.util.transformPoint(
    { x: -bg.width / 2, y: -bg.height / 2 },
    bg.calcTransformMatrix()
  );

  // const items = Array(5)
  //   .fill(0)
  //   .map((_, i) => {
  //     const item = new fabric.Rect({
  //       width: 10,
  //       height: 20,
  //       fill: "green",
  //       selectable: false,
  //     });
  //     item.on("mouseup", () => console.log(`item #${i}`));
  //     return item;
  //   });

  // const box1 = new Box(items, {
  //   left: zero.x,
  //   top: zero.y,
  //   padding: 10,
  //   bgColor: "yellow",
  //   selectable: false,
  //   direction: "column",
  //   spacing: 10,
  // });
  // box1.set({ scaleY: 1.2 });
  // box1.rotate(20);

  // const mBox1 = box1.calcTransformMatrix();

  // const translatedItems = items.map((item) => {
  //   const translated = fabric.util.object.clone(item);
  //   const mItem = translated.calcTransformMatrix();
  //   const mat = fabric.util.multiplyTransformMatrices(mBox1, mItem);
  //   fabric.util.applyTransformToObject(translated, mat);

  //   translated.set({
  //     fill: "purple",
  //     width: item.width + -10,
  //     height: item.height + -10,
  //   });
  //   return translated;
  // });

  // box1.on("mouseup", () => console.log("box1"));

  // canvas.hoverCursor = "cursor";
  // canvas.add(bg, box1);

  // translatedItems.forEach((item) => {
  //   canvas.add(item);
  // });

  // const items2 = Array(5)
  //   .fill(0)
  //   .map((_, i) => {
  //     const item = new fabric.Rect({
  //       width: 50,
  //       height: 50,
  //       fill: "green",
  //       selectable: false,
  //     });
  //     return item;
  //   });

  // const holder1 = new Holder(items2, {
  //   left: zero.x,
  //   top: zero.y,
  //   padding: 10,
  //   spacing: 10,
  //   bgColor: "grey",
  //   selectable: false,
  // });

  // holder1.set({ left: holder1.left + 10, top: holder1.top + 10 });

  // // const holder2 = new Holder(holder1, { padding: 10, bgColor: "yellow" });

  // holder1.items().forEach((item, i) => {
  //   item.on("mouseup", () => {
  //     console.log("Holder's Item #" + i);
  //   });
  // });

  // holder1.addTo(canvas);

  canvas.renderAll();
}

const yetAgainAnotherBox = (canvas) => {
  const items = Array(6)
    .fill(0)
    .map((_, i) => {
      const item = new fabric.Rect({
        width: 20,
        height: 20,
        fill: "green",
        selectable: false,
      });
      item.on("mouseup", console.log);
      return item;
    });

  const holder = new Holder(items, {
    left: 60,
    top: 80,
    spacing: 8,
    padding: 8,
    direction: "column",
    bgColor: "orange",
    selectable: false,
  });

  holder.set({ top: 20 });

  holder.item(0).on("mouseup", (e) => {
    console.log("FIRE!!!");
  });

  holder.renderTo(canvas);
  canvas.renderAll();
};
module.exports = {
  boxDebugRunner,
  boxEventDebugRunner,
  anotherBox,
  yetAgainAnotherBox,
};
