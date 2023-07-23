/* eslint-disable max-len */
import { gifListID } from '../common/elements-ids.js';
// import { fetchGifFromID } from '../requests/get-requests.js';
import { EMPTY_HEART, INFO } from '../common/constants.js';
import { toggleFavorite } from './favorites-functionality.js';
import { individualGifView } from '../views/individual-gif-view.js';

// Stores the elements which are to be shown on the webpage
const gifList = document.getElementById(gifListID);

/**
 * Creates a 'like' button in the form of an empty heart
 * that will add gif to favorites
 * @param {Object} gif object
 * @return {HTMLButtonElement} the like button in the form of a heart
 */
const createFavButton = (gif) => {
  const favButton = document.createElement('button');
  favButton.innerHTML = `<span type='click' data-id='${gif.id}' class='fav-button'>${EMPTY_HEART}</span>`;

  favButton.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('fav-button')) {
      // Checks the current status of the heart and changes it on clicking
      toggleFavorite(gif.id);
    }
  });
  return favButton;
};

/**
 * Creates an info button to display details about the gif
 * @param {Object} gif object
 * @return {HTMLButtonElement} the info button in the form of an emoji
 */
const createInfoButton = (gif) => {
  const infoButton = document.createElement('button');
  infoButton.innerHTML = `<span type='click' data-id='${gif.id}' class='info-button'>${INFO}</span>`;

  infoButton.addEventListener('click', async () => {
    const favBtn = createFavButton(gif);
    const gifItem = createGifElement(gif);
    gifItem.setAttribute('id', 'detailed-gif');
    gifItem.appendChild(favBtn);

    const individualViewElement = document.createElement('div');
    individualViewElement.innerHTML = individualGifView(gif);

    gifList.innerHTML = '';
    [gifItem, individualViewElement].map((el) => gifList.appendChild(el));
  });
  return infoButton;
};

/**
 * Takes the data for an individual gif and puts the image in a div
 * container to be displayed on the page
 * @param {Object} gif: the data for the individual gif, as obtained
 * from the GIPHY API
 * @return {Element} div containing the individual gif; later 'info' and 'add to favorites'
 * buttons are added to it
 */
export const createGifElement = (gif) => {
  const gifItem = document.createElement('div');
  gifItem.classList.add('gif-item');

  gifItem.setAttribute('data-id', gif.id);

  const img = document.createElement('img');
  img.src = gif.images.fixed_height.url;

  gifItem.appendChild(img);

  return gifItem;
};

/**
 * Creates a gif container element to show on the web page
 * @param {Object} gif object
 * @return {HTMLDivElement} the gif element with like and info buttons, which are added to the webpage container
 */
export const createGifElementWithButtons = (gif) => {
  const gifItem = createGifElement(gif);
  // Add the favorite/like and info buttons
  const favButton = createFavButton(gif);
  const infoButton = createInfoButton(gif);

  [favButton, infoButton].map((el) => gifItem.appendChild(el));

  return gifItem;
};
