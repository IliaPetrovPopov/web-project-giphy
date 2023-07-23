/* eslint-disable max-len */
import { gifList } from '../index.js';
import { createGifElementWithButtons } from '../utils/creating-elements.js';
/**
 * HTML code for the page displaying the gif that was just uploaded by the user
 * @param {Object} gif: the data for the gif
 */
export const uploadedGifView = (gif) => {
  const message = document.createElement('div');
  message.innerHTML = `<br><div id='just-uploaded'> Here's the GIF<br> you just uploaded:<div>`;
  gifList.appendChild(message);

  const newGif = createGifElementWithButtons(gif);
  gifList.appendChild(newGif);
};
