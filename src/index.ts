import { Application, Container, Sprite, ColorMatrixFilter } from "pixi.js";
import * as dat from "dat.gui";

// Settings
const settings = {
  saturnX: 315,
  saturnY: 200,
  saturnWidth: 130,
  saturnHeight: 130,
  backgroundColor: 0x0,
};

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: settings.backgroundColor,
  width: 640,
  height: 500,
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
saturn.x = settings.saturnX;
saturn.y = settings.saturnY;
saturn.width = settings.saturnWidth;
saturn.height = settings.saturnHeight;

const filter = new ColorMatrixFilter();
filter.hue(180, true); // Rotate the hue by 180 degrees
filter.contrast(2, true); // Increase the contrast
saturn.filters = [filter];
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
gui.add(settings, 'saturnX', -saturn.width, app.renderer.width).onChange(() => {
  saturn.position.x = settings.saturnX;
});

gui.add(settings, 'saturnY', -saturn.height, app.renderer.height).onChange(() => {
  saturn.position.y = settings.saturnY;
});

gui.add(settings, 'saturnWidth', 0, 400).onChange(() => {
  saturn.width = settings.saturnWidth;
});

gui.add(settings, 'saturnHeight', 0, 400).onChange(() => {
  saturn.height = settings.saturnHeight;
});

// Update loop
app.ticker.add(() => {
  // Update the position of the sprite
  saturn.position.x = settings.saturnX;
  saturn.position.y = settings.saturnY;

  saturn.width = settings.saturnWidth;
  saturn.height = settings.saturnHeight;
});


// clampy.anchor.set(0.5);

// clampy.x = app.screen.width / 2;
// clampy.y = app.screen.height / 2;

// app.stage.addChild(clampy);
