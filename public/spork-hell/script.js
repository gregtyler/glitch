/* globals htmlToArray */
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

async function api(req) {
  const response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&${req}`);
  return await response.json();
}

async function getRandomCategory() {
  const obj = await api('action=query&format=json&list=random&rnnamespace=14&rnlimit=1');
  const id = obj.query.random[0].id;
  const theme = obj.query.random[0].title.substr(9);
  
  let cont;
  const members = [];
  
  while (cont !== false) {
    const memberQuery = await api(`action=query&format=json&list=categorymembers&cmpageid=${id}&cmprop=title&cmnamespace=0&cmlimit=max` + (cont ? `cmcontinue=${cont}` : ''));
    
    members.push(...memberQuery.query.categorymembers.map(x => x.title));
    
    if (memberQuery.continue) {
      cont = memberQuery.continue.cmcontinue;
    } else {
      cont = false;
    }
  }
  
  if (members.length >= 3) {
    return { theme, members };
  } else {
    return getRandomCategory();
  }
}

async function getListData(pageId) {
  const response = await api(`action=parse&format=json&pageid=${pageId}`);
  const revision = response.parse.text['*'];
  
  return htmlToArray(revision);
}

function stringToMatcher(str) {
  return str
      .toLowerCase()
      .replace(/\s*\(.+\)$/, '')
      .replace(/[^a-z0-9]/g, '');
}

async function start() {
  $('#btn-start').innerHTML = 'Loading...';
  $('#btn-start').disabled = true;
  
  // Fetch data
  const { theme, members } = await getRandomCategory();
  
  // Prep page
  $('#txt-title').innerHTML = theme.substr(0, 1).toUpperCase() + theme.substr(1);
  $('#txt-intro').innerHTML = `Wikipedia has identified ${members.length} pages related to <strong>${theme}</strong>. How many can you name?`;
  
  // Reset input and table
  $('#quiz-list').innerHTML = '';
  $('#quiz-prompt').value = '';
  $('#quiz-prompt').disabled = false;
  
  // Add results table
  members.forEach(member => {
    const $li = document.createElement('li');
    $li.hidden = true;
    $li.innerHTML = member;
    
    $('#quiz-list').appendChild($li);
  });
  
  // Add scoring
  const correct = [];
  $('#txt-score').innerHTML = 0;
  $('#txt-out-of').innerHTML = members.length;
  
  $('#quiz-prompt').addEventListener('keyup', () => {
    const val = stringToMatcher($('#quiz-prompt').value);
    
    if (!val || val.length < 3) return;
    
    members.forEach((pageTitle, index) => {
      if (stringToMatcher(pageTitle) === val && !correct.includes(index)) {
        correct.push(index);
        $('#txt-score').innerHTML = parseInt($('#txt-score').innerHTML) + 1;
        $('#quiz-list').children[index].hidden = false;
        $('#quiz-list').children[index].setAttribute('correct', true);
        $('#quiz-prompt').value = '';
      }
    });
  });
  
  // Add "give up" button
  $('#btn-retire').addEventListener('click', () => {
    $('#quiz-prompt').disabled = true;
    Array.from($('#quiz-table').children).forEach($row => $row.hidden = false);
  });
  
  // Change page
  $('#page-intro').hidden = true;
  $('#page-quiz').hidden = false;
}


$('#btn-start').addEventListener('click', start);
$('#btn-another').addEventListener('click', () => {
  $('#page-intro').hidden = false;
  $('#page-quiz').hidden = true;
  start();
});
