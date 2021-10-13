class BoxDebugger extends fabric.Group {
  constructor() {
    const bg = new fabric.Rect({
      top: 150,
      left: 150,
      width: 200,
      height: 150,
      fill: "#000000",
    });

    const mid = new fabric.Rect({
      top: bg.top - 40,
      left: bg.left + bg.width / 2,
      width: 40,
      height: 40,
      fill: "yellow",
    });

    const rect1 = new fabric.Rect({
      width: 30,
      height: 30,
      fill: "green",
    });
    const rect2 = new fabric.Rect({
      width: 20,
      height: 20,
      fill: "red",
    });
    const text1 = new fabric.Text("Lorem Ipsum!", {
      fontSize: 12,
      fill: "yellow",
      stroke: 0,
    });

    const box2 = new Box([rect1, rect2, text1], {
      backgroundColor: "blue",
      // top: 150,
      // left: 150,
      padding: 10,
      width: 200,
      // height: 100,
      direction: "row",
      justify: "start",
      align: "center",
      autoLayout: true,
      spacing: 5,
    });

    const box3 = fabric.util.object.clone(box2);
    box3.top = 30;
    console.log(box3 === box2);
    const wrapper = new Box([box2, box3], {
      autoLayout: true,
      direction: "column",
      top: 150,
      left: 150,
    });

    super([bg, wrapper, mid]);
  }
}
