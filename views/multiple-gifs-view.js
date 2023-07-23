import { createGifElementWithButtons } from '../utils/creating-elements.js';
import { gifList } from '../index.js';
import { updateFavoriteButton } from '../utils/favorites-functionality.js';

/**
 * A view that displays an array of GIFs, whether it's
 * search results, trending GIFs, GIFs uploaded by the user,
 * or the GIFs the user has marked as favorites
 * @param {Array} gifArr: Array of objects, each of which contains data
 * on one individual GIF that will be displayed on the page
 */
export const multipleGifsView = (gifArr) => {
  if (!gifArr || !gifArr.length || gifArr.length === 0) {
    gifList.innerHTML = `<div id="home-page">
    <h3>Oops... we couldn't find anything at this time.</h3>
    <h4>Give us one more chance by trying again?</h4>ƒ
    `;
    return;
  }
  gifArr.forEach((gif) => {
    const gifItem = createGifElementWithButtons(gif);
    gifList.appendChild(gifItem);
    updateFavoriteButton(gif.id);
  });
};
