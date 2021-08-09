import { TaskbarUI } from "./component/TaskbarUI.js";
import renderer from "./renderer.js";

const stage = new PIXI.Container();
renderer.render(stage);
// const app = new PIXI.Application({
//   backgroundColor: 0x1099bb
// });

// document.body.appendChild(app.view)

const taskbar = new TaskbarUI({ height: 40 });
stage.addChild(taskbar);

const startText = new PIXI.Text('Start', {fontSize: 16, fill : 0xffffff});
const startBtn = startText
startBtn.buttonMode = true;
// const startBtn = new PIXI.Button({ text: startText })
taskbar.addItem(startBtn);
// // // app.ticker.