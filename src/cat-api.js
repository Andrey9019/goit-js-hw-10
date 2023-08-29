export function fetchBreeds() {
  const params = new URLSearchParams({
    api_key: `live_A14mPWvaHfH66mRuEZV6H32JWACYBavU9nk4o8JqwDthDh4nsQxQu6l0WUyT82cX`,
  });

  return fetch(`https://api.thecatapi.com/v1/breeds?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

fetchBreeds()
  .then(data => console.log(data))
  .catch(err => console.log(err));
