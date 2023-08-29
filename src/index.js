import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api.js';

const elem = {
  select: document.querySelector(`.breed-select`),
  loader: document.querySelector(`.loader`),
  error: document.querySelector(`.error`),
  catInfo: document.querySelector(`.cat-info`),
};

// new SlimSelect({
//   select: '#selectElement',
// });

//name;
// description
// temperament
// id
// url

async function giveBreedSelect() {
  const breeds = await fetchBreeds();
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    elem.select.appendChild(option);
  });
}

giveBreedSelect();

elem.select.addEventListener(`change`, handlerSelect);

function handlerSelect(id) {
  const selectedBreedId = id.target.value;
  if (selectedBreedId) {
    const arr = fetchCatByBreed(selectedBreedId);
    createMarkup(arr);
  } else {
    catInfo.innerHTML = '';
  }
}

function createMarkup(arr) {
  return arr
    .map(({ name, description, temperament, image: { id, url } }) => {})
    .join(
      `<option>${name}</option>
      <option>${description}</option>
      <option>${temperament}</option>
      <option>${id}</option>
      <option>Option 3</option>`
    );
}
