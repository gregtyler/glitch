/**
 *
 * @param {string} seed
 */
function shuffle(seed) {
  const arr = new Int16Array(256).map((_, i) => i);

  let seedNum = seed
    .split("")
    .reduce((sum, v, i) => sum + seed.charCodeAt(i) ** i, 0);

  const random = () => {
    var x = Math.sin(seedNum++) * 10000;
    return x - Math.floor(x);
  };

  var m = arr.length,
    t,
    i;

  while (m) {
    i = Math.floor(random() * m--);

    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

function constantVector(perm) {
  switch (perm & 3) {
    case 0:
      return [1.0, 1.0];
    case 1:
      return [-1.0, 1.0];
    case 2:
      return [-1.0, -1.0];
    case 3:
      return [1.0, -1.0];
  }
}

function fade(t) {
  return ((6 * t - 15) * t + 10) * t * t * t;
}

function lerp(t, x, y) {
  return x + t * (y - x);
}

function perlin(permutation, x, y) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  const corners = [
    [xf, yf - 1.0], //topleft
    [xf - 1.0, yf - 1.0], //topright
    [xf - 1.0, yf], //bottomright
    [xf, yf], //bottomleft
  ];

  const values = [
    permutation[permutation[X] + Y + 1],
    permutation[permutation[X + 1] + Y + 1],
    permutation[permutation[X + 1] + Y],
    permutation[permutation[X] + Y],
  ];

  const dotProducts = [
    dot(corners[0], constantVector(values[0])),
    dot(corners[1], constantVector(values[1])),
    dot(corners[2], constantVector(values[2])),
    dot(corners[3], constantVector(values[3])),
  ];

  const u = fade(xf);
  const v = fade(yf);

  return lerp(
    v,
    lerp(u, dotProducts[3], dotProducts[2]),
    lerp(u, dotProducts[0], dotProducts[1])
  );
}

function fractalBrownianMotion(x, y, permutation, numOctaves) {
  let result = 0.0;
  let amplitude = 1.0;
  let frequency = 0.005;

  for (let octave = 0; octave < numOctaves; octave++) {
    const n = amplitude * perlin(permutation, x * frequency, y * frequency);
    result += n;

    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return result;
}

/**
 * @template {typeof Element} T
 * @param {string} selector
 * @param {T} type
 * @returns {InstanceType<T>}
 */
function query(selector, type) {
  const $element = document.querySelector(selector);
  if ($element === null) throw new Error(`Cannot find ${selector}`);
  if (!($element instanceof type))
    throw new Error(`${selector} is not of type ${type.name}`);

  return /** @type {InstanceType<T>} */ ($element);
}

function generate() {
  const $canvas = document.querySelector("canvas");
  if (!$canvas) throw new Error("Cannot find canvas");
  const ctx = $canvas.getContext("2d");
  if (!ctx) throw new Error("Cannot create canvas context");
  const pixels = ctx.createImageData(500, 500);

  const $bindSeed = query('[name="seed"]', HTMLInputElement);
  const $bindOctaves = query('[name="brownian-octaves"]', HTMLInputElement);
  const $bindPixels = query('[name="pixels"]', HTMLInputElement);
  const $bindColouring = query('[name="colouring"]', HTMLSelectElement);

  const seed = $bindSeed.value;
  const octaves = $bindOctaves.value;

  const permutation = shuffle(seed);

  const scale = 500 / (parseInt($bindPixels.value, 10) || 500);

  for (let y = 0; y < 500; y++) {
    for (let x = 0; x < 500; x++) {
      let height = fractalBrownianMotion(
        Math.floor(x / scale),
        Math.floor(y / scale),
        permutation,
        octaves
      );

      // Transform the range from [-1.0, 1.0] to [0.0, 1.0]
      height += 1.0;
      height /= 2.0;

      if ($bindColouring.value === "map") {
        let colour = [0, height * 255, 0];
        if (height < 0.3) {
          colour = [0, 0, 300 - height * 3 * 255];
        }
        if (height > 0.9) {
          colour = [255 - (1 - height) * 1280, 255, 255 - (1 - height) * 1280];
        }

        pixels.data[y * 500 * 4 + x * 4] = colour[0];
        pixels.data[y * 500 * 4 + x * 4 + 1] = colour[1];
        pixels.data[y * 500 * 4 + x * 4 + 2] = colour[2];
        pixels.data[y * 500 * 4 + x * 4 + 3] = 255;
      } else if ($bindColouring.value === "bw") {
        const c = Math.round(255 * height);
        pixels.data[y * 500 * 4 + x * 4] = c;
        pixels.data[y * 500 * 4 + x * 4 + 1] = c;
        pixels.data[y * 500 * 4 + x * 4 + 2] = c;
        pixels.data[y * 500 * 4 + x * 4 + 3] = 255;
      }
    }
  }

  ctx.putImageData(pixels, 0, 0);
}

generate();

document
  .querySelectorAll("input")
  .forEach(($x) => $x.addEventListener("keyup", generate));
document
  .querySelectorAll("input,select")
  .forEach(($x) => $x.addEventListener("change", generate));
