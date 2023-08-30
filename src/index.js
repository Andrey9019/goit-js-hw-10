import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elems = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
elems.catInfo.classList.add('is-hidden');

elems.breedSelect.addEventListener('change', createMarkup);

function createMarkup(evt) {
  elems.loader.classList.replace('is-hidden', 'loader');
  elems.breedSelect.classList.add('is-hidden');
  elems.catInfo.classList.add('is-hidden');

  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      elems.loader.classList.replace('loader', 'is-hidden');
      elems.breedSelect.classList.remove('is-hidden');

      const { url, breeds } = data[0];

      elems.catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
      <div class=""><h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
      elems.catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}
updateSelect();

function updateSelect(data) {
  fetchBreeds(data)
    .then(data => {
      elems.loader.classList.replace('loader', 'is-hidden');

      let markSelect = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      elems.breedSelect.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select: elems.breedSelect,
      });
    })
    .catch(onError);
}

function onError() {
  elems.error.classList.remove('error');
  elems.loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Ой! Щось пішло не так! Спробуйте перезавантажити сторінку або виберіть іншу породу котів!'
  );
}
