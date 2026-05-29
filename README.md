# Bouncing Balls Physics Simulation

A 2D physics simulation built entirely from scratch using TypeScript and the HTML5 Canvas API.

This project was created as a learning journey into game physics, simulation programming, vector mathematics, and collision systems. Instead of relying on existing physics engines such as Matter.js or Box2D, every major component was implemented manually.

## Features

* Real-time Canvas rendering
* Delta-time based simulation
* Custom Vector2D implementation
* Gravity and acceleration
* Wall collision detection
* Ball-to-ball collision detection
* Impulse-based collision response
* Friction and restitution (bounciness)
* Runtime simulation controls
* Collision visualization
* Adjustable physics parameters

---

## Live Concepts Demonstrated

This project explores many of the fundamental concepts used in modern game engines and physics systems:

### Mathematics

* Vectors
* Magnitude
* Distance calculations
* Normalization
* Dot products

### Physics

* Position
* Velocity
* Acceleration
* Gravity
* Friction
* Restitution
* Collision normals
* Relative velocity
* Impulse response

### Computer Science

* Simulation loops
* Delta time
* Collision systems
* Entity management
* O(n²) collision detection

---

## Learning Journey

This project was intentionally developed incrementally.

### Stage 1 — Rendering

Started with rendering a single circle using the Canvas API.

Learned:

* Canvas rendering
* Animation loops
* Browser graphics

### Stage 2 — Motion

Introduced:

* Velocity
* Acceleration
* Gravity

Implemented:

```ts
velocity += acceleration;
position += velocity;
```

---

### Stage 3 — Delta Time

Made the simulation frame-rate independent.

Implemented:

```ts
velocity += acceleration * dt;
position += velocity * dt;
```

---

### Stage 4 — Vectors

Created a custom `Vector2D` class.

Implemented:

* add()
* subtract()
* multiply()
* divide()
* magnitude()
* distance()
* normalize()
* dot()

---

### Stage 5 — Wall Collisions

Added:

* Floor collisions
* Ceiling collisions
* Side wall collisions

Introduced:

* Restitution
* Collision response

---

### Stage 6 — Friction

Discovered the difference between:

* Surface friction
* Air drag

Implemented friction that only applies while grounded.

---

### Stage 7 — Multiple Objects

Refactored the simulation from:

```ts
Ball
```

to:

```ts
Ball[]
```

allowing hundreds of simultaneous entities.

---

### Stage 8 — Ball-to-Ball Collisions

Implemented:

```ts
distance < radiusA + radiusB
```

for collision detection.

Learned:

* Pairwise collision checks
* Circle intersection tests

---

### Stage 9 — Collision Normals

Introduced normalized direction vectors to determine:

* Collision direction
* Separation direction
* Impulse direction

This was the biggest conceptual breakthrough of the project.

---

### Stage 10 — Impulse Response

Implemented:

* Relative velocity
* Dot products
* Collision impulses

to create realistic collision behavior between balls.

---

## Controls

The simulation includes a control panel for modifying parameters at runtime.

### Adjustable Parameters

| Parameter       | Description               |
| --------------- | ------------------------- |
| Gravity         | Downward acceleration     |
| Speed           | Simulation time scale     |
| Radius          | Ball size                 |
| Bounciness      | Collision elasticity      |
| Count           | Number of balls           |
| Default Color   | Normal ball color         |
| Collision Color | Collision highlight color |

---

## Installation

Clone the repository:

```bash
git clone https://github.com/ItsPinion/Bouncing-Balls-Simulation.git
```

Navigate into the project:

```bash
cd Bouncing-Balls-Simulation
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal.

---

## How To Use

1. Launch the simulation.
2. Observe the default behavior.
3. Adjust gravity and speed.
4. Increase the ball count.
5. Change bounciness.
6. Experiment with different radii.
7. Observe how collision behavior changes.
8. Study the effects of impulse-based collision response.

Recommended experiments:

* Set gravity to 0.
* Increase ball count dramatically.
* Set bounciness close to 1.
* Slow down the simulation.
* Compare high and low friction values.

---

## Performance

Current collision detection uses a naive pairwise approach:

```text
O(n²)
```

This was intentionally chosen for educational purposes to understand how collision systems work internally.

Future improvements could include:

* Spatial Hashing
* Uniform Grids
* Quadtrees
* Broad Phase Collision Detection

---

## Future Improvements

* Ball mass
* Rotational physics
* Angular momentum
* Mouse interaction
* Spatial partitioning
* Constraint systems
* Springs
* Soft-body physics
* Performance optimizations

---

## Why This Project Exists

The purpose of this project was not to build the most advanced physics simulator.

The goal was to understand the underlying principles behind modern physics engines by implementing them manually.

Every feature was built incrementally, from a single bouncing ball to a multi-object impulse-based collision system.

The result is both a working simulation and a documented exploration of fundamental physics-engine concepts.

---

## License

MIT License
