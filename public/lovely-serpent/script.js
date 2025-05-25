const $page = document.querySelector('[data-id="page"]');
const $heading = document.querySelector('[data-id="heading"]');
const $content = document.querySelector('[data-id="content"]');
const $rollPrompt = document.querySelector('[data-id="roll-prompt"]');
const $actions = document.querySelector('[data-id="actions"]');
      
const snakes = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

const ladders = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  71: 91,
};

// Render a particular page
function go(page) {
  $page.hidden = false;
  $heading.innerText = page;
  
  if (snakes[page]) {
    $content.innerText = 'You come across a snake. It bites you with poisonous venom, nulling your senses. When you regain control, you find you have wandered back the way you came.';
    $rollPrompt.hidden = true;
    $actions.innerHTML = `Go to <a href="#${snakes[page]}">page ${snakes[page]}</a>`;
  } else if (ladders[page]) {
    $content.innerText = 'A magic ladder greets you. As you climb its rungs it bends and morphs through the passageways, taking you deeper into the dungeon.';
    $rollPrompt.hidden = true;
    $actions.innerHTML = `Go to <a href="#${ladders[page]}">page ${ladders[page]}</a>`;
  } else {
    const colours = ['green', 'yellow', 'white', 'red', 'blue'];
    const word = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
    const pathCount = page + 6 > 100 ? 100 - page : 6;
    
    if (page === 1) {
      $content.innerText = 'You stand at the entrance of a vast dungeon. Untold treasues and loot lay inside, just waiting to be pillaged!';
    } else {
      $content.innerText = `You find yourself on a ${colours[page % 5]} square. Ahead, ${word[pathCount]} ${pathCount === 1 ? 'path is' : 'paths are'} available.`;
    }
    
    $rollPrompt.hidden = false;
    $actions.innerHTML = '';
    
    for (let i = 1; i <= 6 && (page + i) <= 100; i++) {
      const $li = document.createElement('li');
      $li.innerHTML = `If you rolled a <strong>${i}</strong>, turn to <a href="#${page + i}">page ${page + i}</a>`;
      $actions.appendChild($li);
    }
    
    if (pathCount < 6) {
      const $li = document.createElement('li');
      $li.innerHTML = `If you rolled <strong>any other number</strong>, roll again`;
      $actions.appendChild($li);
    }
  }
}

// When the page changes, render it
window.addEventListener('hashchange', () => {
  const id = parseInt(window.location.hash.substr(1), 10);
  $page.hidden = true;
  
  setTimeout(() => {
    go(id);
  }, 2050);
});

// Start the book
window.location.hash = 1;
go(1);