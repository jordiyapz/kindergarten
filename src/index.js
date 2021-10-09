const fs = require("fs");
const { fabric } = require("fabric");

const canvas = new fabric.StaticCanvas(null, { width: 200, height: 200 });
const text = new fabric.Text("Hello Canvas", {
  left: 20,
  top: 20,
  fill: "#f55",
  angle: 15,
});
canvas.add(text);
canvas.renderAll();

const out = fs.createWriteStream(__dirname + "/helloworld.png");
var stream = canvas.createPNGStream();

stream.on("data", function (chunk) {
  out.write(chunk);
  console.log(`Written ${chunk.length} bytes of data`);
});

stream.on("end", function () {
  console.log("Done!");
});
