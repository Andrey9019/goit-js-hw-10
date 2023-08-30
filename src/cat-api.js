const URL_BREEDS = `https://api.thecatapi.com/v1/breeds`;
const URL_CatImg = `https://api.thecatapi.com/v1/images/search`;
const API_KEY =
  'live_A14mPWvaHfH66mRuEZV6H32JWACYBavU9nk4o8JqwDthDh4nsQxQu6l0WUyT82cX';

export function fetchBreeds() {
  return fetch(`${URL_BREEDS}?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${URL_CatImg}?api_key=${API_KEY}&breed_ids=${breedId}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
