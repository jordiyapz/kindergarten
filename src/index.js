import { Renderer, Loader } from 'pixi.js'
import OperatingSystem from './component/OperatingSystemUI';

const renderer = new Renderer({
  view: document.getElementById('main-canvas'),
  backgroundColor: 0x81a2f0
})

const loader = new Loader('assets', 10);
loader.onLoad.add(loader => {
  console.log(`Loading: ${loader.progress}%`);
})
loader
  .add('windows-logo', 'windows-logo-w-64.png')
  .add('quest-icon', 'quest-64.png')
  .load(setup)

function setup(loader, resources) {
  const operatingSystem = new OperatingSystem(renderer.screen.width, renderer.screen.height);
  operatingSystem.setup(resources);
  renderer.render(operatingSystem);
}
