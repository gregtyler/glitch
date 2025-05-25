/* globals htmlToArray */
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

async function api(req) {
  const response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&${req}`);
  return await response.json();
}

async function listRandomPages() {
  const obj = await api('action=query&format=json&list=random&rnnamespace=0&rnlimit=50');
  return obj.query.random;
}

async function getRandomList() {
  const pages = await listRandomPages();
  const list = pages.find(p => p.title.substr(0, 8) === 'List of ');
  
  if (list) {
    let data;
    try {
      data = await getListData(list.id);
    } catch (e) {
      return await getRandomList();
    }
    
    return {
      theme: list.title.substr(8),
      data,
    };
  } else {
    return await getRandomList();
  }
}

async function getListData(pageId) {
  const response = await api(`action=parse&format=json&pageid=${pageId}`);
  const revision = response.parse.text['*'];
  
  return htmlToArray(revision);
}

function stringToMatcher(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function start() {
  $('#btn-start').innerHTML = 'Loading...';
  $('#btn-start').disabled = true;
  
  // Fetch data
  const { theme, data: { headers, data } } = await getRandomList();
  
  if (theme.substr(0, 4).toLowerCase() === 'the ') theme = theme.substr(4);
  
  // Prep page
  $('#txt-title').innerHTML = theme.substr(0, 1).toUpperCase() + theme.substr(1);
  $('#txt-intro').innerHTML = `How well do you know your ${theme}? List as many as you can!`;
  
  // Reset input and table
  $('#quiz-table-header').innerHTML = '';
  $('#quiz-table').innerHTML = '';
  $('#quiz-prompt').value = '';
  $('#quiz-prompt').disabled = false;
  
  // Add headers
  const $row = document.createElement('tr');
  headers.forEach(header => {
    const $cell = document.createElement('th');
      $cell.innerHTML = header;
      $row.appendChild($cell);
  });
  $('#quiz-table-header').appendChild($row);
  
  // Add results table
  data.forEach(row => {
    const $row = document.createElement('tr');
    $row.hidden = true;
    
    row.forEach(cell => {
      const $cell = document.createElement('td');
      $cell.innerHTML = cell;
      $row.appendChild($cell);
    });
    
    $('#quiz-table').appendChild($row);
  });
  
  // Add scoring
  const correct = [];
  $('#txt-score').innerHTML = 0;
  $('#txt-out-of').innerHTML = data.length;
  
  $('#quiz-prompt').addEventListener('keyup', () => {
    const val = stringToMatcher($('#quiz-prompt').value);
    
    if (!val || val.length < 3) return;
    
    data.forEach((row, index) => {
      row.forEach(cell => {
        if (stringToMatcher(cell) === val && !correct.includes(index)) {
          correct.push(index);
          $('#txt-score').innerHTML = parseInt($('#txt-score').innerHTML) + 1;
          $('#quiz-table').children[index].hidden = false;
          $('#quiz-prompt').value = '';
        }
      });
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

const examples = [
  233682, // List_of_Greek_phrases
  50688850, // List_of_wars_involving_Portugal
  50955553, // List_of_incurable_diseases
];

// examples.forEach(async id => {
//   const data = await getListData(id);
//   console.log(data);
// });