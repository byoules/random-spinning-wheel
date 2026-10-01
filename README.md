# Random JavaScript Spinning Wheel

**Owner:** Brad Youles  
**Status:** Active  
**Last reviewed:** 2026-09-30

---

## Purpose

This standalone HTML and JavaScript tool creates an animated spinning wheel that randomly selects one option from a configurable list.

The wheel is designed to be simple to customize and can be used for demonstrations, random selections, presentations, videos, classroom activities, giveaways, testing, or other situations where a visual random-choice tool is useful.

The project includes:

- a configurable number of wheel slots
- editable values directly in the browser
- automatic wheel segment generation
- randomized winner selection
- multiple full rotations before stopping
- smooth deceleration animation
- automatic positioning of the winning value beneath the pointer
- automatic display of the selected value after the spin
- support for longer labels such as organization or project names
- responsive styling for desktop and smaller screens

The tool runs entirely in the browser and does not require a web server, external JavaScript library, API key, or internet connection.

---

## Current Default Values

The default configuration contains four possible selections:

- Brad
- Youles
- University of Michigan
- IRIS

These can be changed directly in the interface before spinning the wheel.

---

## Project Structure

```text
random-spinning-wheel/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
└── .gitignore
```

### `index.html`
Contains the page structure, wheel controls, canvas element, and links to the stylesheet and JavaScript file.

### `style.css`
Contains all visual styling, responsive behavior, button styles, wheel sizing, and page layout.

### `script.js`
Contains the wheel drawing logic, random selection logic, animation, configuration handling, and result display.

---

## Requirements

Only a modern web browser is required.

Examples include:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

No installation or package manager is required.

---

## Running the Project

Clone or download the repository and open:

```text
index.html
```

in a web browser.

No local server is required.

---

## Usage

1. Enter the desired number of wheel slots.
2. Enter one value per line in the values box.
3. Click **UPDATE WHEEL**.
4. Click **SPIN THE WHEEL**.
5. The wheel will rotate several times, gradually slow down, and stop on one randomly selected value.
6. The selected value is displayed beneath the wheel.

The number of values used is controlled by the number of slots. If too few values are provided, placeholder values such as `Option 5` are added automatically.

---

## Default Configuration

The default values are defined near the top of `script.js`:

```javascript
const DEFAULT_VALUES = [
  "Brad",
  "Youles",
  "University of Michigan",
  "IRIS"
];
```

You can change these if you want different values to appear when the page first loads.

---

## Wheel Colors

Wheel colors are stored in the `COLORS` array in `script.js`:

```javascript
const COLORS = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#0891b2",
  "#ca8a04",
  "#db2777",
  "#4f46e5",
  "#0f766e"
];
```

Colors are reused automatically if the wheel contains more slots than colors.

---

## Random Selection

The winning slot is selected using JavaScript's built-in random number generation:

```javascript
const winnerIndex = Math.floor(Math.random() * values.length);
```

Each configured slot has an equal chance of being selected.

The selected slot is then positioned beneath the wheel pointer after several complete rotations.

---

## Animation

The wheel uses `requestAnimationFrame()` for smooth browser-based animation.

The animation process:

1. randomly selects the winning slot
2. calculates the center of the selected wheel segment
3. adds several complete wheel rotations
4. applies an easing function to gradually reduce the rotation speed
5. stops the selected segment beneath the pointer
6. displays the selected value

The slowdown effect uses an ease-out cubic function:

```javascript
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
```

---

## Customization

The interface supports between 2 and 20 wheel slots by default.

To change this limit, edit the validation in `script.js`:

```javascript
const requestedSlots = Math.max(2, Math.min(20, Number(slotCountInput.value) || 4));
```

You can also modify:

- wheel colors
- page background
- button styling
- wheel size
- animation duration
- number of full rotations
- font size and label positioning

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- HTML Canvas
- `requestAnimationFrame()`
- JavaScript `Math.random()`

---

## Potential Uses

- random name selection
- classroom activities
- giveaways
- demonstrations
- presentation graphics
- YouTube videos
- software or tool selection
- task selection
- project demonstrations
- simple browser-based randomization

---

## Privacy and Data

This application is entirely client-side.

No entered values are transmitted anywhere, and the project does not use analytics, cookies, databases, API calls, or external services.

Refreshing or closing the page resets the current values back to the defaults defined in `script.js`.

---

## License

This project is released under the MIT License. See `LICENSE` for details.

---

## Keywords

JavaScript, HTML, CSS, spinning wheel, random spinning wheel, random selector, random picker, random choice generator, wheel spinner, JavaScript wheel, HTML Canvas, HTML5 Canvas, random name picker, animated wheel, browser-based tool, standalone HTML, JavaScript animation, requestAnimationFrame, random selection, customizable spinning wheel, prize wheel, selection wheel, randomizer, offline JavaScript tool, Brad Youles, University of Michigan, IRIS
