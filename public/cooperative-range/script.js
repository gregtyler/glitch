/* globals d3 */
// CONSTANTS
const TYPE_RED    = 0;
const TYPE_BLUE   = 1;
const TYPE_YELLOW = 2;
const TYPE_PINK   = 3;
const TYPE_ORANGE = 4;
const TYPE_X      = 'x';
const TYPE_REFILL = 'TYPE_REFILL';
const TYPES = [TYPE_RED, TYPE_BLUE, TYPE_YELLOW, TYPE_PINK, TYPE_ORANGE]

const colourMap = {
  [TYPE_RED]: 'red',
  [TYPE_BLUE]: 'blue',
  [TYPE_YELLOW]: 'yellow',
  [TYPE_PINK]: 'pink',
  [TYPE_ORANGE]: 'orange',
  [TYPE_X]: 'lightgrey',
  [TYPE_REFILL]: 'limegreen',
}

// LIBRARY
function randomType() {
  return TYPES[Math.floor(Math.random() * TYPES.length)];
}

function* intGenerator() {
  let i = 0;
  while (true) yield i++;
}

class Bus {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];

    this.events[event].push(listener);
  }

  dispatch(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach(listener => {
      listener.apply(this, args)
    })
  }
}

class BlockMap extends Bus {
  constructor(width, height, template) {
    super()

    this.width = width;
    this.height = height;
    this.gen = intGenerator();

    this.map = template.map(def => {
      return def ? randomType() : TYPE_X;;
    });
  }

  get regions() {
    if (this._cachedRegions) return this._cachedRegions

    const regions = this.map.map(x => 0);
    this.gen = intGenerator();

    function combineRegions(index1, index2, stopIndex) {
      const region1 = regions[index1];
      const region2 = regions[index2];

      for (let i = 0; i < stopIndex; i++) {
        if (regions[i] === region2) {
          regions[i] = region1;
        }
      }

      return region1;
    }

    for (let index in this.map) {
      const val = this.map[index]
      const leftVal = index >= this.height ? this.map[index - this.height] : null;
      const aboveVal = (index % this.height !== 0) ? this.map[index - 1] : null;

      if (leftVal === val && aboveVal === val) {
        regions[index] = combineRegions(index - this.height, index - 1, index);
      } else if (leftVal === val) {
        regions[index] = regions[index - this.height];
      } else if (aboveVal === val) {
        regions[index] = regions[index - 1];
      } else {
        regions[index] = this.gen.next().value;
      }
    }

    this._cachedRegions = regions

    return this._cachedRegions
  }

  removeCell(index) {
    this.removeRegion(this.regions[index]);
  }

  removeRegion(id) {
    for (let i in this.map) {
      if (this.regions[i] === id) {
        this.map[i] = TYPE_REFILL;
      }
    }

    this.refillBoard();
  }

  refillBoard() {
    for (let col = 0; col < this.width; col++) {
      // this.refillColumn(col);
    }

    this._cachedRegions = null;

    this.dispatch('change');
  }

  refillColumn(columnIndex) {
    let topOfColumn = columnIndex * this.height;
    let bottomOfColumn = (columnIndex * this.height) + this.height - 1;
    console.log(topOfColumn, bottomOfColumn);

    for (let i = bottomOfColumn; i > topOfColumn; i--) {
      if (this.map[i] !== TYPE_REFILL) {
        continue;
      }

      if (this.map[i - 1] === TYPE_X) {
        topOfColumn = i - 1;
        break;
      } else {
        this.map[i] = this.map[i - 1];
        this.map[i - 1] = TYPE_REFILL;
      }
    }

    this.map[topOfColumn] = randomType();
  }
}

function render(map, $graph) {
  $graph
    .selectAll()
    .data(map.map)
    .enter()
      .append('rect')
      .attr('x', (d, i) => Math.floor(i / 5) * 32)
      .attr('y', (d, i) => (i % 5) * 32)
      .attr('width', 32)
      .attr('height', 32)
      .attr('fill', d => colourMap[d] || 'transparent')
      .on('click', (d, i) => {
        map.removeCell(i);
      })
  ;
}

function renderRegions(map, $graph) {
  $graph
    .selectAll()
    .data(map.regions)
    .enter()
      .append('text')
      .attr('x', (d, i) => Math.floor(i / 5) * 32)
      .attr('y', (d, i) => (i % 5) * 32)
      .attr('dx', 16)
      .attr('dy', 16)
      .html(d => d)
}

// APP
const mapTemplate = [
  1, 1, 1, 1, 1,
  0, 1, 1, 1, 1,
  1, 1, 1, 1, 1,
  0, 1, 1, 1, 1,
  1, 1, 1, 1, 1
];

const map = new BlockMap(5, 5, mapTemplate);

const $svg = d3.select('#app')
  .append('svg')
  .attr('width', map.width * 32)
  .attr('height', map.height * 32);

render(map, $svg);
renderRegions(map, $svg);

map.on('change', () => {
  $svg.html(null);
  render(map, $svg);
  renderRegions(map, $svg);
})

map.dispatch('change')
