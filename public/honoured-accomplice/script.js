const characters = {
  darrin: {
    name: `Darrin "Flash" Williams`,
    image: "./img/darrin-williams.png",
    stats: {
      spd: [4, 4, 4, 5, 6, 7, 7, 8],
      mgt: [2, 3, 3, 4, 5, 6, 6, 7],
      knw: [1, 2, 3, 4, 5, 5, 5, 7],
      san: [2, 3, 3, 4, 5, 5, 5, 7],
    },
    defaults: { spd: 5, mgt: 3, knw: 3, san: 3 },
  },
  ox: {
    name: "Ox Bellows",
    image: "./img/ox-bellows.png",
    stats: {
      spd: [2, 2, 2, 3, 4, 5, 5, 6],
      mgt: [4, 5, 5, 6, 6, 7, 8, 8],
      knw: [2, 2, 3, 4, 5, 5, 6, 7],
      san: [2, 2, 3, 3, 5, 5, 6, 6],
    },
    defaults: { spd: 5, mgt: 3, knw: 3, san: 3 },
  },
  zostra: {
    name: "Madame Belladina Zostra",
    image: "./img/madame-zostra.png",
    stats: {
      spd: [2, 3, 3, 5, 5, 6, 6, 7],
      mgt: [2, 3, 3, 4, 5, 5, 5, 6],
      knw: [1, 3, 4, 4, 4, 5, 6, 6],
      san: [4, 4, 4, 5, 6, 7, 8, 8],
    },
    defaults: { spd: 3, mgt: 4, knw: 4, san: 3 },
  },
  lopez: {
    name: "Vivian Lopez",
    image: "./img/vivian-lopez.png",
    stats: {
      spd: [3, 4, 4, 4, 4, 6, 7, 8],
      mgt: [2, 2, 2, 4, 4, 5, 6, 6],
      knw: [4, 5, 5, 5, 5, 6, 6, 7],
      san: [4, 4, 4, 5, 6, 7, 8, 8],
    },
    defaults: { spd: 4, mgt: 3, knw: 4, san: 3 },
  },
  peter: {
    name: "Peter Akimoto",
    image: "./img/peter-akimoto.png",
    stats: {
      spd: [3, 3, 3, 4, 6, 6, 7, 7],
      mgt: [2, 3, 3, 4, 5, 5, 6, 8],
      knw: [3, 4, 4, 5, 6, 6, 7, 8],
      san: [3, 4, 4, 4, 5, 6, 6, 7],
    },
    defaults: { spd: 4, mgt: 3, knw: 3, san: 4 },
  },
  brandon: {
    name: "Brandon Jaspers",
    image: "./img/brandon-jaspers.png",
    stats: {
      spd: [3, 4, 4, 4, 5, 6, 7, 8],
      mgt: [2, 3, 3, 4, 5, 6, 6, 7],
      knw: [1, 3, 3, 5, 5, 6, 6, 7],
      san: [3, 3, 3, 4, 5, 6, 7, 8],
    },
    defaults: { spd: 4, mgt: 4, knw: 3, san: 4 },
  },
  zoe: {
    name: "Zoe Ingstrom",
    image: "./img/zoe-ingstrom.png",
    stats: {
      spd: [4, 4, 4, 4, 5, 6, 8, 8],
      mgt: [2, 2, 3, 3, 4, 4, 6, 7],
      knw: [1, 2, 3, 4, 4, 5, 5, 5],
      san: [3, 4, 5, 5, 6, 6, 7, 8],
    },
    defaults: { spd: 4, mgt: 4, knw: 3, san: 3 },
  },
  missy: {
    name: "Missy Dubourde",
    image: "./img/missy-dubourde.png",
    stats: {
      spd: [3, 4, 5, 6, 6, 6, 7, 7],
      mgt: [2, 3, 3, 3, 4, 5, 6, 7],
      knw: [2, 3, 4, 4, 5, 6, 6, 6],
      san: [1, 2, 3, 4, 5, 5, 6, 7],
    },
    defaults: { spd: 3, mgt: 4, knw: 4, san: 3 },
  },
  reginald: {
    name: "Father Reginald Rhinehardt",
    image: "./img/father-rhinehardt.png",
    stats: {
      spd: [2, 3, 3, 4, 5, 6, 7, 7],
      mgt: [1, 2, 2, 4, 4, 5, 5, 7],
      knw: [1, 3, 3, 4, 5, 6, 6, 8],
      san: [3, 4, 5, 5, 6, 7, 7, 8],
    },
    defaults: { spd: 3, mgt: 3, knw: 4, san: 5 },
  },
  josiah: {
    name: "Professor Josiah Longfellow",
    image: "./img/professor-longfellow.png",
    stats: {
      spd: [2, 2, 4, 4, 5, 5, 6, 6],
      mgt: [1, 2, 3, 4, 5, 5, 6, 6],
      knw: [4, 5, 5, 5, 6, 6, 7, 8],
      san: [1, 3, 3, 4, 5, 5, 6, 7],
    },
    defaults: { spd: 4, mgt: 3, knw: 4, san: 3 },
  },
  heather: {
    name: "Heather Granville",
    image: "./img/heather-granville.png",
    stats: {
      spd: [3, 3, 4, 5, 6, 6, 7, 8],
      mgt: [3, 3, 3, 4, 5, 6, 7, 8],
      knw: [2, 3, 3, 4, 5, 6, 7, 8],
      san: [3, 3, 3, 4, 5, 6, 6, 6],
    },
    defaults: { spd: 3, mgt: 3, knw: 5, san: 3 },
  },
  jenny: {
    name: "Jenny Leclerc",
    image: "./img/jenny-leclerc.png",
    stats: {
      spd: [2, 3, 4, 4, 4, 5, 6, 8],
      mgt: [3, 4, 4, 4, 4, 5, 6, 8],
      knw: [2, 3, 3, 4, 4, 5, 6, 8],
      san: [1, 1, 2, 4, 4, 4, 5, 6],
    },
    defaults: { spd: 4, mgt: 3, knw: 3, san: 5 },
  },
};

const SAVE_KEY = "BETRAYAL";

const data = load();

function load() {
  const data = localStorage.getItem(SAVE_KEY);

  if (data) {
    return JSON.parse(data);
  }

  return {
    players: [],
  };
}

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

const $app = /** @type {HTMLDivElement} */ (document.getElementById("app"));
const $characterTemplate = /** @type {HTMLTemplateElement} */ (
  document.getElementById("character-template")
);
const $selectorTemplate = /** @type {HTMLTemplateElement} */ (
  document.getElementById("selector-template")
);

document.getElementById("reset")?.addEventListener("click", () => {
  localStorage.removeItem(SAVE_KEY);
  window.location.reload();
});

function populateCards() {
  $app.innerHTML = "";

  data.players.forEach(({ id, ...player }) => {
    const character = characters[id];

    const template = $characterTemplate.content.cloneNode(true);

    template.querySelector(".c-character__image").src = character.image;
    template.querySelector(".c-character__title").innerText = character.name;

    ["spd", "mgt", "san", "knw"].map((stat) => {
      template.querySelector(`[data-stat-id="${stat}"] > span`).innerHTML =
        buildStatHTML(character.stats[stat], player[stat]);
    });

    template.querySelectorAll(".c-character__btn").forEach(($btn) => {
      $btn.addEventListener("click", (e) => {
        const dir = $btn.classList.contains("c-character__btn--negative")
          ? -1
          : 1;
        const stat = $btn.parentNode.getAttribute("data-stat-id");

        const player = data.players.find((x) => x.id === id);
        let newStatValue = player[stat] + dir;
        if (newStatValue < 0) newStatValue = 0;
        if (newStatValue >= 8) newStatValue = 8;

        player[stat] = newStatValue;

        save();

        $btn.parentNode.querySelector("span").innerHTML = buildStatHTML(
          character.stats[stat],
          newStatValue
        );
      });
    });

    $app.appendChild(template);
  });
}

function populateIntro() {
  $app.innerHTML = "";

  const $container = document.createElement("div");
  $container.classList.add("c-select-list");

  Object.entries(characters).forEach(([characterId, character]) => {
    const template = $selectorTemplate.content.cloneNode(true);

    template.querySelector('[name="chars"]').value = characterId;
    template.querySelector(".c-character__image").src = character.image;
    template.querySelector(".c-character__title").innerText = character.name;

    $container.append(template);
  });

  $app.appendChild($container);

  const $button = document.createElement("button");
  $button.innerText = "Continue ⏎";

  $button.addEventListener("click", () => {
    $container
      .querySelectorAll('[name="chars"]:checked')
      .forEach(($checked) => {
        const id = $checked.value;

        data.players.push({ id, ...characters[id].defaults });
      });

    save();
    populateCards();
  });

  const $p = document.createElement("p");
  $p.appendChild($button);

  $app.appendChild($p);
}

/**
 *
 * @param {number[]} strip
 * @param {number} value
 */
function buildStatHTML(strip, value) {
  if (value === 0) {
    return "💀";
  }

  const pre = strip.slice(0, value - 1).join(" ");
  const current = strip.slice(value - 1, value)[0];
  const post = strip.slice(value).join(" ");

  return `
    <span>💀</span>
    <span class="c-character__stat--faded">${pre}</span>
    <span class="c-character__stat--current">${current}</span>
    <span class="c-character__stat--faded">${post}</span>
  `;
}

if (data.players.length > 0) {
  populateCards();
} else {
  populateIntro();
}
