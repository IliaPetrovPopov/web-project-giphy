import { createGifElementWithButtons } from '../utils/creating-elements.js';
import { gifList } from '../index.js';

/**
 * The view is rendered when there are no favorite gifs to display,
 * for which the user is notified and a random gif is displayed n addition
 * @param {Object} randomGif: an object containing data
 * about a randomly generated gif via the GIPHY API
 */
export const randomGifView = (randomGif) => {
  const randomGifItem = createGifElementWithButtons(randomGif);

  gifList.innerHTML = `<p id = 'random-gif-page'>It looks like 
  you don't have any favorite GIFs yet.<br>
  Here's a random one from us: </p>`;
  gifList.appendChild(randomGifItem);
};
