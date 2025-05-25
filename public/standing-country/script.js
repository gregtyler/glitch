/* global schema, data */
const $prompt = document.querySelector('[data-js="prompt"]');
const $input = document.querySelector('[data-js="input"]');
const $questions = document.querySelector('[data-js="questions"]');

function log(content) {
  if (typeof content !== 'string') content = JSON.stringify(content);
  document.getElementById('log').innerHTML += `${content}<br>`
}

function getRandomProperty() {
  // Reduce all properties to a single array
  const props = schema.reduce((arr, item) => {
    const propertiesWithLookup = item.properties.map(property => ({
      ...property,
      address: item.address,
    }));
    return arr.concat(propertiesWithLookup);
  }, []);

  // Select a random property
  return props[Math.floor(Math.random() * props.length)];
}

function getRandomItem(address) {
  const directory = data[address];
  return directory[Math.floor(Math.random() * directory.length)];
}

function translate(input) {
  if (Array.isArray(input)) {
    return translate(input[0]);
  }

  if (typeof input !== 'string') {
    return input.toString();
  }

  const matches = input.match(/@(.+)\/(.+)/);
  if (matches) {
    // Translate `@address/id` references into a label
    const [_, address, id] = matches;
    const item = data[address].find(x => x.id === id);
    return item.label;
  } else {
    return input;
  }
}

function canonical(str) {
  if (typeof str !== 'string') {
    return '';
  }

  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function $buildQuestionSection(pairs) {
  const $root = document.createDocumentFragment();
  pairs.forEach(([question, answer]) => {
    const $row = document.createElement('tr');
    const $question = document.createElement('th');
    $question.innerHTML = question;

    const $answer = document.createElement('td');
    $answer.dataset.answer = answer;

    $row.appendChild($question);
    $row.appendChild($answer);
    $root.appendChild($row);
  });

  return $root;
}

function getDefinitionQuestion(prop)  {
  const definition = schema.find(x => x.address === prop.address);
  const prompt = `What is the ${prop.label} of each ${definition.noun.singular}?`;
  const pairs = data[prop.address]
    .filter(item => typeof item[prop.property] !== 'undefined')
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(item => [
      translate(item.label),
      translate(item[prop.property]),
    ]);

  return { prompt, pairs };
}

function getTopThreeQuestion(prop) {
  const definition = schema.find(x => x.address === prop.address);
  const prompt = `Name the top three ${definition.noun.plural} by ${prop.label}`;

  const pairs = data[prop.address]
    .filter(item => typeof item[prop.property] !== 'undefined')
    .sort((a, b) => b[prop.property] - a[prop.property])
    .slice(0, 3)
    .map(item => [
      translate(item[prop.property]),
      translate(item.label),
    ]);

  return { prompt, pairs };
}

// Generate question
const qProp = getRandomProperty();
let question;
if (qProp.type === 'number') {
  question = getTopThreeQuestion(qProp);
} else {
  question = getDefinitionQuestion(qProp);
}

// Build HTML
$prompt.innerHTML = question.prompt;
$questions.innerHTML = '';
$questions.appendChild($buildQuestionSection(question.pairs));

console.log(question);

// Prepare input
$input.addEventListener('keyup', () => {
  const input = canonical($input.value);
  let isMatch = false;

  question.pairs.forEach(([question, answer], index) => {
    if (input === canonical(answer)) {
      isMatch = true;
      $questions.children[index].querySelector('td').innerHTML = answer;
    }
  });

  if (isMatch) {
    $input.value = '';
  }
});
