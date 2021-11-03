import OperatingSystem from "./component/OperatingSystemUI";

const setup = (PIXI, { rendererOpts }) => {
  const { Renderer, Loader, Ticker } = PIXI;
  const renderer = new Renderer(rendererOpts);

  const loader = new Loader("assets", 10);
  loader.onLoad.add((loader) => {
    console.log(`Loading: ${loader.progress}%`);
  });
  loader
    .add("windows-logo", "windows-logo-w-64.png")
    .add("quest-icon", "quest-64.png")
    .load(setup);

  const operatingSystem = new OperatingSystem(
    renderer.screen.width,
    renderer.screen.height
  );

  const ticker = new Ticker();
  ticker.autoStart = true;
  ticker.add(gameLoop);

  function setup(loader, resources) {
    operatingSystem.setup(resources);
  }

  function gameLoop(delta) {
    renderer.render(operatingSystem);
  }
};

export default setup;