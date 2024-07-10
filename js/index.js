const URL_PREFIX = 'http://localhost:3000/';
let page = 1;

const getMonsters = (page) => {
  fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
      const container = document.querySelector('#monster-container');
      container.innerHTML = '';
      monsters.forEach(monster => {
        createMonsterCard(monster);
      });
    });
};

const createMonsterCard = (monster) => {
  const card = document.createElement('div');
  const name = document.createElement('h2');
  const age = document.createElement('h4');
  const description = document.createElement('p');

  name.innerText = monster.name;
  age.innerText = `Age: ${monster.age}`;
  description.innerText = `Bio: ${monster.description}`;

  card.appendChild(name);
  card.appendChild(age);
  card.appendChild(description);
  document.querySelector('#monster-container').appendChild(card);
};

const createMonsterForm = () => {
  const form = document.createElement('form');
  const nameInput = document.createElement('input');
  const ageInput = document.createElement('input');
  const descriptionInput = document.createElement('input');
  const createButton = document.createElement('button');

  form.id = 'monster-form';
  nameInput.id = 'name';
  ageInput.id = 'age';
  descriptionInput.id = 'description';
  nameInput.placeholder = 'name...';
  ageInput.placeholder = 'age...';
  descriptionInput.placeholder = 'description...';
  createButton.innerText = 'Create';

  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descriptionInput);
  form.appendChild(createButton);
  document.getElementById('create-monster').appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const monsterData = {
      name: nameInput.value,
      age: parseFloat(ageInput.value),
      description: descriptionInput.value
    };
    postNewMonster(monsterData);
    form.reset();
  });
};

const postNewMonster = (monster) => {
  fetch(`${URL_PREFIX}monsters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(monster)
  })
    .then(response => response.json())
    .then(newMonster => {
      console.log('new monster', newMonster);
    });
};

const addNavListeners = () => {
  document.querySelector('#back').addEventListener('click', () => {
    if (page > 1) {
      page--;
      getMonsters(page);
    } else {
      alert('No more monsters to show');
    }
  });
  document.querySelector('#forward').addEventListener('click', () => {
    page++;
    getMonsters(page);
  });
};

const init = () => {
  getMonsters(page);
  createMonsterForm();
  addNavListeners();
};

document.addEventListener('DOMContentLoaded', init);
