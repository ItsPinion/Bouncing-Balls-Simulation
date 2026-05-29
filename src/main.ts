import "./style.css";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export const physics = {
  gravity: 9.8 * 100,
  speed: 1,
};

export const defaultBallConfig = {
  radius: 5,
  bounciness: 0.9,
  count: 1000,
  collisionColor: "red",
  defaultColor: "blue",
};

class Vector2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  subtract(v: Vector2D) {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  multiply(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }

  divide(scalar: number) {
    if (scalar === 0) return this;

    this.x /= scalar;
    this.y /= scalar;

    return this;
  }

  distance(v: Vector2D): number {
    // return Math.sqrt(this.x * this.x + this.y * this.y);

    return Math.sqrt(
      (this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y),
    );
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  static zero() {
    return new Vector2D(0, 0);
  }
  normalize() {
    const mag = this.magnitude();

    if (mag === 0) {
      return Vector2D.zero();
    }

    return this.clone().divide(mag);
  }
  dot(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }
}

class Ball {
  position: Vector2D;
  velocity: Vector2D;
  acc: Vector2D;
  radius: number;
  bounciness: number;
  colliding: boolean = false;
  constructor(
    position: Vector2D,
    velocity: Vector2D,
    acc: Vector2D,
    radius: number,
    bounciness: number,
  ) {
    this.position = position;
    this.velocity = velocity;
    this.acc = acc;
    this.radius = radius;
    this.bounciness = bounciness;
  }

  isGrounded(canvas: HTMLCanvasElement) {
    const floorY = canvas.height;
    return this.position.y >= floorY - this.radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);

    ctx.fillStyle = this.colliding
      ? defaultBallConfig.collisionColor
      : defaultBallConfig.defaultColor;

    ctx.fill();
    ctx.stroke();
  }
}

export const balls: Ball[] = [];

export function initBalls(count: number) {
  balls.length = 0;
  for (let i = 0; i < count; i++) {
    balls.push(
      new Ball(
        new Vector2D(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
        ),
        new Vector2D(Math.random() * (2000 * 2) - 2000, 0),
        new Vector2D(0, physics.gravity),
        defaultBallConfig.radius,
        defaultBallConfig.bounciness,
      ),
    );
  }
}

// initial population
initBalls(defaultBallConfig.count);

function updatePhysics(ball: Ball, dt: number) {
  ball.acc = new Vector2D(0, physics.gravity);
  ball.velocity.add(ball.acc.clone().multiply(dt));
  ball.position.add(ball.velocity.clone().multiply(dt));
}

function resolveWallCollisions(ball: Ball) {
  // ceiling check
  if (ball.position.y < ball.radius) {
    ball.position.y = ball.radius;
    ball.velocity.y *= -ball.bounciness;
  }
  // floor check
  if (ball.position.y > canvas.height - ball.radius) {
    ball.position.y = canvas.height - ball.radius;

    ball.velocity.y *= -ball.bounciness;

    // sleep threshold
    if (Math.abs(ball.velocity.y) < 0.1) {
      ball.velocity.y = 0;
    }
  }
  // left wall check
  if (ball.position.x < ball.radius) {
    ball.position.x = ball.radius;
    ball.velocity.x *= -ball.bounciness;
  }
  // right wall check
  if (ball.position.x > canvas.width - ball.radius) {
    ball.position.x = canvas.width - ball.radius;
    ball.velocity.x *= -ball.bounciness;
  }
}

function resolveBallCollisions() {
  for (const ball of balls) {
    ball.colliding = false;
  }

  for (let i = 0; i < balls.length; i++) {
    const ball1 = balls[i];
    for (let j = i + 1; j < balls.length; j++) {
      const ball2 = balls[j];

      let difference = ball1.position.clone().subtract(ball2.position);

      let distance = difference.magnitude();
      if (distance === 0) {
        distance = 0.0001;
      }
      let totalRadius = ball1.radius + ball2.radius;

      if (distance < totalRadius) {
        ball1.colliding = true;
        ball2.colliding = true;

        let overlap = totalRadius - distance;

        let collisionNormal = difference.clone().normalize();

        let separationVector = collisionNormal.clone().multiply(overlap / 2);

        ball1.position.add(separationVector);
        ball2.position.subtract(separationVector);

        const relativeVelocity = ball1.velocity
          .clone()
          .subtract(ball2.velocity);

        const velocityAlongNormal = relativeVelocity.dot(collisionNormal);

        if (velocityAlongNormal > 0) {
          continue;
        }

        const restitution = Math.min(ball1.bounciness, ball2.bounciness);

        const impulseStrength = (-(1 + restitution) * velocityAlongNormal) / 2;

        const impulse = collisionNormal.clone().multiply(impulseStrength);

        ball1.velocity.add(impulse);
        ball2.velocity.subtract(impulse);
      }
    }
  }
}
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const ball of balls) {
    ball.draw(ctx);
  }
}

let previousTimestamp = 0;

function loop(timestamp: number) {
  if (previousTimestamp === 0) {
    previousTimestamp = timestamp;
    requestAnimationFrame(loop);
    return;
  }
  const dt = ((timestamp - previousTimestamp) / 1000) * physics.speed;
  previousTimestamp = timestamp;

  // physics
  for (const ball of balls) {
    updatePhysics(ball, dt);
  }

  // world collisions
  for (const ball of balls) {
    resolveWallCollisions(ball);
  }

  // ball collisions
  resolveBallCollisions();

  // rendering
  render();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
