import tilemap from "./tilemap.js";

const canvas = document.getElementById("root");
const ctx = canvas.getContext("2d");
let image;
const cells = [];

for (let x = 0; x < 5; x++) {
  cells[x] = [];
  for (let y = 0; y < 5; y++) cells[x][y] = { options: Object.keys(tilemap) };
}

async function load() {
  image = new Image();
  image.src = "./image.png";

  canvas.width = 64 * 5;
  canvas.height = 64 * 5;

  ctx.imageSmoothingEnabled = false;

  return new Promise((resolve) => {
    image.addEventListener("load", (e) => {
      resolve();
    });
  });
}

function draw() {
  ctx.clearRect(0, 0, 64 * 5, 64 * 5);

  cells.forEach((column, x) => {
    column.forEach((cell, y) => {
      if (cell.options.length === 1) {
        const tile = tilemap[cell.options[0]];
        ctx.drawImage(
          image,
          tile.x * 16,
          tile.y * 16,
          16,
          16,
          x * 64,
          y * 64,
          64,
          64
        );
      } else {
        cell.options.forEach((tileId, i) => {
          const tile = tilemap[tileId];
          ctx.drawImage(
            image,
            tile.x * 16,
            tile.y * 16,
            16,
            16,
            x * 64 + 16 * (i % 4),
            y * 64 + 16 * Math.floor(i / 4),
            16,
            16
          );

          // ctx.fillText(tileId, (x * 64) + (16 * (i % 4)), 8 + (y * 64) + (16 * Math.floor(i / 4)))
        });
      }
    });
  });
}

function isComplete() {
  return cells.flat().every((cell) => cell.options.length === 1);
}

function getNeighbours(address) {
  const neighbours = [];

  if (address[0] != 0) neighbours.push([address[0] - 1, address[1], "left"]);
  if (address[1] != 0) neighbours.push([address[0], address[1] - 1, "top"]);
  if (address[0] < 5 - 1)
    neighbours.push([address[0] + 1, address[1], "right"]);
  if (address[1] < 5 - 1)
    neighbours.push([address[0], address[1] + 1, "bottom"]);

  return neighbours;
}

function selectOption(tileIds) {
  const idsWithWeight = tileIds.map((id) => [id, tilemap[id].weight || 1]);
  const totalWeight = idsWithWeight
    .filter((tile) => tile[1] > 0)
    .reduce((sum, tile) => sum + tile[1], 0);
  const target = Math.random() * totalWeight;

  let runningTotal = 0;
  return idsWithWeight.find((option) => {
    runningTotal += option[1];
    return runningTotal >= target;
  })[0];
}

function collapse() {
  let address = [];
  let min = Infinity;

  cells.forEach((column, x) => {
    column.forEach((cell, y) => {
      if (cell.options.length !== 1 && cell.options.length < min) {
        min = cell.options.length;
        address = [x, y];
      }
    });
  });

  if (min === Infinity) return null;

  const targetCell = cells[address[0]][address[1]];
  targetCell.options = [selectOption(targetCell.options)];

  return address;
}

// Can the cell at {address} contain {tile}?
function possible(address, tile) {
  const opposite = {
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top",
  };

  // Do the neighbours all have something appropriate for {tile}?
  const neighbourAllows = getNeighbours(address).map(([x, y, direction]) => {
    const neighbour = cells[x][y];
    return neighbour.options.some((option) => {
      const neighbourTile = tilemap[option];
      return tile[direction] === neighbourTile[opposite[direction]];
    });
  });

  return neighbourAllows.every((x) => !!x);
}

function calculateOptions(address) {
  return Object.entries(tilemap)
    .filter(([key, value]) => possible(address, value))
    .map(([key, value]) => key);
}

function propagate(central) {
  const queue = [];
  queue.push(central);

  let iterations = 0;

  do {
    const address = queue.shift();
    iterations++;
    getNeighbours(address).forEach((nAddress) => {
      const optionsBefore = cells[nAddress[0]][nAddress[1]].options;
      if (optionsBefore.length === 1) return;

      const optionsAfter = calculateOptions(nAddress);

      if (optionsAfter.length !== optionsBefore.length) {
        queue.push(nAddress);
      }

      cells[nAddress[0]][nAddress[1]].options = optionsAfter;
    });
  } while (queue.length);
}

(async () => {
  await load();
  draw();
  let updated = true;

  do {
    updated = collapse();

    if (updated) {
      propagate(updated);
    }
  } while (updated !== null);

  draw();
})();
