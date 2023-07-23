import { FAVORITE_GIFS, UPLOADED_GIFS } from './common/constants.js';
// element IDs as constants
import {
  trendingTabID,
  favoritesTabID,
  aboutTabID,
  searchBoxID,
  uploadButtonID,
  uploadBoxID,
  gifListID,
  uploadedTabID,
  titleID,
  searchInputID,
} from './common/elements-ids.js';

// views
import { homeView } from './views/home-view.js';
import { aboutView } from './views/about-view.js';
import { multipleGifsView } from './views/multiple-gifs-view.js';
import { randomGifView } from './views/random-gif-view.js';
import { uploadedGifView } from './views/uploaded-gif-view.js';

import { getFavorites } from './utils/favorites-functionality.js';

// requests
import {
  fetchGifFromID,
  fetchGifsFromIDs,
  fetchRandom,
  fetchSearch,
  fetchTrending,
} from './requests/get-requests.js';
import { uploadGif } from './requests/post-request.js';

// page elements
const title = document.getElementById(titleID);

const trendingTab = document.getElementById(trendingTabID);
const favoritesTab = document.getElementById(favoritesTabID);
const aboutTab = document.getElementById(aboutTabID);
const uploadedTab = document.getElementById(uploadedTabID);

const searchBox = document.getElementById(searchBoxID);

const uploadButton = document.getElementById(uploadButtonID);
const uploadBox = document.getElementById(uploadBoxID);

export const gifList = document.getElementById(gifListID);

// clear localStorage at the start of each session
localStorage.clear();
localStorage.setItem(FAVORITE_GIFS, '');
localStorage.setItem(UPLOADED_GIFS, '');

// Event listeners

/**
 * clicking on the title redirects to the 'home' screen,
 * which is also loaded when the application is started
 */
title.addEventListener('click', (event) => {
  gifList.innerHTML = homeView();
});

/**
 * clicking on the 'about' tab redirects to the 'about' screen,
 * which displays information about the application and its authors
 */
aboutTab.addEventListener('click', async (event) => {
  event.preventDefault();
  gifList.innerHTML = '';

  gifList.innerHTML = aboutView();
});

/**
 * clicking the search button takes the text entered in the search box
 * by the user, and fetches result matching their search
 */
searchBox.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchQuery = document.getElementById(searchInputID).value;
  const result = await fetchSearch(searchQuery);

  gifList.innerHTML = '';

  multipleGifsView(result);
});

/**
 * clicking the 'trending' tab renders a page displaying the top gifs
 * that are currently trending
 */
trendingTab.addEventListener('click', async (event) => {
  event.preventDefault();

  const result = await fetchTrending();
  gifList.innerHTML = '';

  multipleGifsView(result);
});

/**
 * clicking the 'favorites' tab renders a page displaying the gifs
 * that the user has marked as his favorites
 */
favoritesTab.addEventListener('click', async (event) => {
  event.preventDefault();

  if (localStorage.getItem(FAVORITE_GIFS) === '') {
    const randomGif = await fetchRandom();
    randomGifView(randomGif);
  } else {
    getFavorites();
  }
});

uploadButton.addEventListener('click', (event) => {
  uploadBox.click();
});

/**
 * upload a gif file to GIPHY
 */
uploadBox.addEventListener('change', async (event) => {
  const newFile = event.target.files[0];
  if (!newFile) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', newFile);

    const gifID = await uploadGif(formData);
    const gifData = await fetchGifFromID(gifID);

    gifList.innerHTML = '';
    uploadedGifView(gifData);
  } catch (error) {
    console.error('Error uploading GIF:', error);
    alert('Problem uploading GIF. Please try again');
  }
});

/**
 * clicking the uploaded tab renders a page displaying the gifs
 * that the user has uploaded to GIPHY
 */
uploadedTab.addEventListener('click', async () => {
  const uploadedGifsIDsString = localStorage.getItem(UPLOADED_GIFS);

  gifList.innerHTML = '';

  if (uploadedGifsIDsString.length === 0) {
    gifList.innerHTML = `<p id='upload-page'>
    Upload gifs to see them here... </p>`;
  } else {
    const result = await fetchGifsFromIDs(uploadedGifsIDsString);

    multipleGifsView(result);
  }
});
