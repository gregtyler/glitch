import { sets } from "./sets.mjs";

const $card = document.querySelector(".c-card");
if (!($card instanceof HTMLDialogElement))
  throw new Error("Expected .c-card to be a dialog element");
const $cardContent = document.querySelector(".c-card__content");
if (!$cardContent) throw new Error("Expected .c-card__content to exist");
const $savedArea = document.querySelector(".c-saved");
if (!($savedArea instanceof HTMLOListElement))
  throw new Error("Expected .c-saved to be an ordered list element");

/**
 * @param {string} value
 */
const save = (value) => {
  const $item = document.createElement("li");
  $item.textContent = value;
  $savedArea.appendChild($item);
  $savedArea.hidden = false;
};

document.addEventListener("click", (e) => {
  if (e.target instanceof HTMLButtonElement && e.target.dataset.set) {
    const setName = e.target.dataset.set;
    const set = sets[setName];
    if (!set) throw new Error(`No set found for name: ${setName}`);

    const value = set[Math.floor(Math.random() * set.length)];

    $cardContent.classList.toggle("c-card__content--big", value.length <= 2);
    $cardContent.textContent = value;
    $card.showModal();
  }

  if (
    e.target instanceof HTMLButtonElement &&
    e.target.closest(".c-card__actions") &&
    e.target.dataset.action
  ) {
    const action = e.target.dataset.action;
    if (action === "close") {
      $card.close();
    } else if (action === "save") {
      save($cardContent.textContent || "");
      $card.close();
    }
  }

  if (
    e.target instanceof HTMLLIElement &&
    e.target.parentElement === $savedArea
  ) {
    e.target.remove();

    if ($savedArea.children.length === 0) {
      $savedArea.hidden = true;
    }
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then((reg) => {
    reg.addEventListener("updatefound", function () {
      console.log(
        "A new version of this application is available. Refresh to update."
      );
    });
  });
}
