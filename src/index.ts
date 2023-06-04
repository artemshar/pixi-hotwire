import { Application, Container, Sprite } from "pixi.js";
import * as dat from "dat.gui";

// Settings
const settings = {
  planetX: 315,
  planetY: 200,
  planetSize: 130,
  backgroundColor: 0x0,
};

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: settings.backgroundColor,
  width: window.innerWidth,
  height: window.innerHeight,
});

// Add Container
const container: Container = new Container();
container.x = 0;
container.y = 0;
container.transform.position.x = 0;
container.transform.position.y = 0;
app.stage.addChild(container);

// Add the image
const saturn: Sprite = Sprite.from("earth.png");
saturn.x = settings.planetX;
saturn.y = settings.planetY;
saturn.width = settings.planetSize;
saturn.height = settings.planetSize;

// const filter = new ColorMatrixFilter();
// filter.hue(180, true); // Rotate the hue by 180 degrees
// filter.contrast(1, true); // Increase the contrast
// saturn.filters = [filter];
container.addChild(saturn);


// const origSettings = Object.assign({}, settings);

// Gui options
const gui = new dat.GUI();
// gui.add(origSettings, "X", 0, 500);
// gui.add(origSettings, "Y", 0, 500);

// Add background color control to dat.gui
gui.addColor(settings, "backgroundColor").onChange((color) => {
  // @ts-ignore
  app.renderer.backgroundColor = color;
});

// Add X and Y position controls to dat.gui
gui.add(settings, 'planetX', -saturn.width, window.innerWidth).onChange(() => {
  saturn.position.x = settings.planetX;
});

gui.add(settings, 'planetY', -saturn.height, window.innerHeight).onChange(() => {
  saturn.position.y = settings.planetY;
});

gui.add(settings, 'planetSize', 10, 600).onChange(() => {
  saturn.width = settings.planetSize;
  saturn.height = settings.planetSize;
});


// Update loop
app.ticker.add(() => {
  // Update the position of the sprite
  saturn.position.x = settings.planetX;
  saturn.position.y = settings.planetY;

  saturn.width = settings.planetSize;
  saturn.height = settings.planetSize;
});
