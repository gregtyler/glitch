import { randomClue } from "./clues.mjs";

/**
 * @param {string} selector
 * @param {ParentNode} [context=document]
 * @returns {HTMLElement}
 */
function $(selector, context = document) {
  const element = context.querySelector(selector);

  if (!(element instanceof HTMLElement)) {
    throw new Error(`Element not found for selector: ${selector}`);
  }
  return element;
}

const $menu = {
  scene: $(".c-scene--menu"),
  randomStart: $(".js-start--random"),
  customStart: $(".js-start--custom"),
  customLower: /** @type {HTMLInputElement} */ ($(".js-lower-input")),
  customUpper: /** @type {HTMLInputElement} */ ($(".js-upper-input")),
};

const $game = {
  scene: $(".c-scene--game"),
  slider: $(".js-slider"),
  goal: $(".js-goal"),
  thumb: $(".js-thumb"),
  labelLower: $(".js-lower"),
  labelUpper: $(".js-upper"),
  btnHide: $(".js-btn--hide"),
  btnGuess: $(".js-btn--guess"),
  scoreContainer: $(".js-score-container"),
  score: $(".js-score"),
  btnRestart: $(".js-btn--restart"),
};

let state_target = 50;

function restart() {
  $menu.customLower.value = "";
  $menu.customUpper.value = "";

  $game.scene.hidden = true;
  $menu.scene.hidden = false;
}

/**
 * @param {string} lower
 * @param {string} upper
 * @param {number} target
 */
function start(lower, upper, target) {
  state_target = target;

  $game.labelLower.textContent = `« ${lower}`;
  $game.labelUpper.textContent = `${upper} »`;
  $game.goal.style.left = `${target}%`;
  $game.thumb.style.left = "50%";
  $game.thumb.hidden = true;

  $game.btnHide.hidden = false;
  $game.btnGuess.hidden = true;

  $game.slider.classList.remove("c-slider--revealed");
  $game.scoreContainer.hidden = true;

  $game.scene.hidden = false;
  $menu.scene.hidden = true;
}

function handover() {
  $game.btnHide.hidden = true;
  $game.btnGuess.hidden = false;
  $game.goal.hidden = true;
  $game.thumb.hidden = false;
}

/**
 * @param {number} guess
 */
function guess(guess) {
  let score = 0;
  const distance = Math.abs(state_target - guess);
  if (distance <= 2) {
    score = 3;
  } else if (distance <= 6) {
    score = 2;
  } else if (distance <= 10) {
    score = 1;
  }

  $game.btnGuess.hidden = true;
  $game.goal.hidden = false;
  $game.slider.classList.add("c-slider--revealed");

  $game.score.textContent = `${score} point${score !== 1 ? "s" : ""}`;
  $game.scoreContainer.hidden = false;
}

/**
 * MARK: Menu events
 */
$menu.randomStart.addEventListener("click", () => {
  const clue = randomClue();

  start(clue[0], clue[1], Math.floor(Math.random() * 100));
});

$menu.customStart.addEventListener("click", () => {
  if (
    $menu.customLower.value.trim() === "" ||
    $menu.customUpper.value.trim() === ""
  ) {
    alert("Please enter both lower and upper labels.");
    return;
  }

  start(
    $menu.customLower.value,
    $menu.customUpper.value,
    Math.floor(Math.random() * 100)
  );
});

/**
 * MARK: Game events
 */
$game.slider.addEventListener("pointerdown", (event) => {
  /**
   * @param {PointerEvent} moveEvent
   */
  const onPointerMove = (moveEvent) => {
    const rect = $game.slider.getBoundingClientRect();
    let x = moveEvent.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;
    $game.thumb.style.left = `${percent}%`;
  };

  const onPointerUp = () => {
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  };

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);

  // Initialize thumb position
  onPointerMove(event);
});

$game.btnHide.addEventListener("click", () => {
  handover();
});

$game.btnGuess.addEventListener("click", () => {
  guess(Number($game.thumb.style.left.replace("%", "")));
});

$game.btnRestart.addEventListener("click", () => {
  restart();
});

restart();
