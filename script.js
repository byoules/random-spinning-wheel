const DEFAULT_VALUES = [
  "Brad",
  "Youles",
  "University of Michigan",
  "IRIS"
];

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

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const updateButton = document.getElementById("updateButton");
const slotCountInput = document.getElementById("slotCount");
const valuesInput = document.getElementById("valuesInput");
const result = document.getElementById("result");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 225;

let values = [...DEFAULT_VALUES];
let rotation = 0;
let spinning = false;

function getConfiguredValues() {
  const requestedSlots = Math.max(2, Math.min(20, Number(slotCountInput.value) || 4));
  slotCountInput.value = requestedSlots;

  const entered = valuesInput.value
    .split(/\r?\n/)
    .map(value => value.trim())
    .filter(Boolean);

  if (entered.length < requestedSlots) {
    for (let i = entered.length; i < requestedSlots; i++) {
      entered.push(`Option ${i + 1}`);
    }
  }

  return entered.slice(0, requestedSlots);
}

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const slotCount = values.length;
  const sliceAngle = (Math.PI * 2) / slotCount;

  for (let i = 0; i < slotCount; i++) {
    const startAngle = rotation + i * sliceAngle - Math.PI / 2;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";

    const label = values[i];
    let fontSize = 26;
    if (label.length > 12) fontSize = 22;
    if (label.length > 18) fontSize = 19;
    if (label.length > 24) fontSize = 17;
    if (slotCount >= 8) fontSize = Math.min(fontSize, 18);
    if (slotCount >= 12) fontSize = Math.min(fontSize, 15);

    ctx.font = `bold ${fontSize}px Arial`;

    // Keep labels safely inside the slice. Long labels are wrapped
    // automatically and, if needed, the font is reduced until they fit.
    const textRadius = radius * 0.60;
    const maxTextWidth = radius * 0.58;
    const maxLines = 3;

    function wrapLabel(text) {
      const words = text.split(/\s+/).filter(Boolean);
      if (words.length === 0) return [""];
      if (words.length === 1) return [text];

      const lines = [];
      let current = words[0];

      for (let w = 1; w < words.length; w++) {
        const test = `${current} ${words[w]}`;
        if (ctx.measureText(test).width <= maxTextWidth) {
          current = test;
        } else {
          lines.push(current);
          current = words[w];
        }
      }
      lines.push(current);
      return lines;
    }

    let lines = wrapLabel(label);

    while (
      (lines.length > maxLines || lines.some(line => ctx.measureText(line).width > maxTextWidth)) &&
      fontSize > 11
    ) {
      fontSize -= 1;
      ctx.font = `bold ${fontSize}px Arial`;
      lines = wrapLabel(label);
    }

    // If a single very long word still does not fit, scale just that line.
    const lineHeight = fontSize * 1.08;
    const startY = -((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, lineIndex) => {
      const measured = ctx.measureText(line).width;
      if (measured > maxTextWidth) {
        ctx.save();
        ctx.translate(textRadius, startY + lineIndex * lineHeight);
        ctx.scale(maxTextWidth / measured, 1);
        ctx.fillText(line, 0, 0);
        ctx.restore();
      } else {
        ctx.fillText(line, textRadius, startY + lineIndex * lineHeight);
      }
    });

    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, 36, 0, Math.PI * 2);
  ctx.fillStyle = "#111827";
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.stroke();
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function spinWheel() {
  if (spinning) return;

  spinning = true;
  spinButton.disabled = true;
  updateButton.disabled = true;
  result.textContent = "";

  const winnerIndex = Math.floor(Math.random() * values.length);
  const sliceDegrees = 360 / values.length;
  const winnerCenter = winnerIndex * sliceDegrees + sliceDegrees / 2;
  const fullSpins = 6 + Math.floor(Math.random() * 4);
  const targetDegrees = fullSpins * 360 - winnerCenter;
  const targetRadians = targetDegrees * Math.PI / 180;
  const startingRotation = rotation;
  const duration = 5000;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    rotation = startingRotation + targetRadians * eased;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      spinButton.disabled = false;
      updateButton.disabled = false;
      result.textContent = values[winnerIndex];
      rotation %= Math.PI * 2;
    }
  }

  requestAnimationFrame(animate);
}

function updateWheel() {
  if (spinning) return;

  values = getConfiguredValues();
  valuesInput.value = values.join("\n");
  result.textContent = "";
  rotation = 0;
  drawWheel();
}

spinButton.addEventListener("click", spinWheel);
updateButton.addEventListener("click", updateWheel);

updateWheel();
