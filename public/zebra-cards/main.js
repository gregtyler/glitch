let zIndex = 1;

function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}

function makeDraggable(state, el) {
  // from https://www.redblobgames.com/making-of/draggable/
  function start(event) {
    if (event.button !== 0) return; // left button only
    let { x, y } = state.eventToCoordinates(event);
    state.dragging = { dx: state.pos.x - x, dy: state.pos.y - y };
    el.classList.add("dragging");
    el.setPointerCapture(event.pointerId);
    el.style.zIndex = zIndex++;
  }

  function end(_event) {
    state.dragging = null;
    el.classList.remove("dragging");
  }

  function move(event) {
    if (!state.dragging) return;
    let { x, y } = state.eventToCoordinates(event);
    state.pos = { x: x + state.dragging.dx, y: y + state.dragging.dy };
  }

  el.addEventListener("pointerdown", start);
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener("pointermove", move);
  el.addEventListener("touchstart", (e) => e.preventDefault());
}

function init() {
  const els = Array.from(document.querySelectorAll(".card"));

  Array.from(els).forEach((el, i) => {
    let state = {
      eventToCoordinates(event) {
        return { x: event.clientX, y: event.clientY };
      },
      dragging: false,

      _pos: { x: 0, y: 0 },
      get pos() {
        return this._pos;
      },
      set pos(p) {
        this._pos = {
          x: clamp(p.x, 0, document.body.clientWidth - el.clientWidth),
          y: clamp(p.y, 0, document.body.clientHeight - el.clientHeight),
        };
        el.style.transform = `translate(${this._pos.x}px,${this._pos.y}px)`;
      },
    };
    state.pos = { x: (i + 1) * 10, y: i * 45 };
    makeDraggable(state, el);

    el.style.transform = `translate(${state.pos.x}px,${state.pos.y}px)`;
  });
}

document.addEventListener("DOMContentLoaded", init);
