/* eslint-disable max-len */
import { gifList } from '../index.js';
import { EMPTY_HEART, FAVORITE_GIFS, FULL_HEART } from '../common/constants.js';
import { fetchGifsFromIDs } from '../requests/get-requests.js';
import { multipleGifsView } from '../views/multiple-gifs-view.js';

/**
 * Checks if the gif is already stored in local storage as favorite
 * @param {String} gifID: the id property of a gif
 */
export const toggleFavorite = (gifID) => {
  const favoriteGifsStr = localStorage.getItem(FAVORITE_GIFS);
  let favoriteGifsArr;
  if (favoriteGifsStr === '') favoriteGifsArr = [];
  else favoriteGifsArr = favoriteGifsStr.split(',');
  if (!favoriteGifsArr.includes(gifID)) {
    favoriteGifsArr.push(gifID);
  } else {
    favoriteGifsArr = favoriteGifsArr.filter((el) => el !== gifID);
  }
  localStorage.setItem(FAVORITE_GIFS, favoriteGifsArr.join(','));

  // Updates the button if needed
  updateFavoriteButton(gifID);
};

/**
 * Updates the like button from empty to full heart or vice versa
 * @param {Number} gifID: the id property of a gif
 * @return {HTMLButtonElement} the updated like button
 */
export const updateFavoriteButton = (gifID) => {
  const favButton = document.querySelector(`[data-id='${gifID}'] .fav-button`);

  if (favButton) {
    const alreadyLiked = localStorage
        .getItem(FAVORITE_GIFS)
        .split(',')
        .includes(gifID);

    favButton.innerHTML = alreadyLiked ? FULL_HEART : EMPTY_HEART;
    return favButton;
  }
};

/**
 * Lists all gifs marked as favorite on the webpage
 * @async
 */
export const getFavorites = async () => {
  const favoritesGifsIDsString = localStorage.getItem(FAVORITE_GIFS);

  gifList.innerHTML = '';

  const result = await fetchGifsFromIDs(favoritesGifsIDsString);
  multipleGifsView(result);
};
