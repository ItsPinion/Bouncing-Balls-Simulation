import { defaultBallConfig, initBalls, balls, physics } from "./main";

// --- UI wiring ---
const gravityInput = document.getElementById(
  "gravityInput",
) as HTMLInputElement;
const speedInput = document.getElementById("speedInput") as HTMLInputElement;
const radiusInput = document.getElementById("radiusInput") as HTMLInputElement;
const bouncinessInput = document.getElementById(
  "bouncinessInput",
) as HTMLInputElement;
const countInput = document.getElementById("countInput") as HTMLInputElement;

const defaultColorInput = document.getElementById(
  "defaultColorInput",
) as HTMLInputElement;
const collisionColorInput = document.getElementById(
  "collisionColorInput",
) as HTMLInputElement;
const accelerateButton = document.getElementById(
  "accelerateButton",
) as HTMLButtonElement;

// live listeners for small updates
defaultColorInput.addEventListener("input", () => {
  defaultBallConfig.defaultColor = defaultColorInput.value;
});
collisionColorInput.addEventListener("input", () => {
  defaultBallConfig.collisionColor = collisionColorInput.value;
});
bouncinessInput.addEventListener("input", () => {
  const bn = parseFloat(bouncinessInput.value);
  defaultBallConfig.bounciness = bn;
  for (const b of balls) b.bounciness = bn;
});
radiusInput.addEventListener("input", () => {
  const r = parseFloat(radiusInput.value);
  defaultBallConfig.radius = r;
  for (const b of balls) b.radius = r;
});
gravityInput.addEventListener("input", () => {
  physics.gravity = (parseFloat(gravityInput.value) || 0) * 100;
});

speedInput.addEventListener("input", () => {
  physics.speed = parseFloat(speedInput.value);
});

countInput.addEventListener("input", () => {
  const newCount = parseInt(countInput.value, 10);
  if (newCount !== balls.length) {
    defaultBallConfig.count = newCount;
    initBalls(newCount);
  }
});

console.log(accelerateButton);
accelerateButton.addEventListener("click", () => {
  for (const b of balls) b.velocity.multiply(2);
});
