import {
  API_KEY_VALENTIN,
  API_KEY_ILIA,
  API_KEY_SLAVENA,
  TRENDING_LIMIT,
  SEARCH_LIMIT,
} from '../common/constants.js';
import { fetchRequest } from './get-request-base.js';

/**
 * Fetches gifs based on the search endpoint
 * @async
 * @param {string} searchQuery: the string which the search is based on
 * @return {Promise} an array of gif objects matching the search string
 */
export const fetchSearch = async (searchQuery) => {
  // eslint-disable-next-line max-len
  const url = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${API_KEY_SLAVENA}&limit=${SEARCH_LIMIT}`;

  try {
    const data = await fetchRequest(url);
    return data;
  } catch (error) {
    console.error('Error searching gifs:', error);
  }
};

/**
 * Fetches gifs currently trending on GIPHY
 * @async
 * @return {Promise} an array of size TRENDING_LIMIT of currently trending gifs
 */
export const fetchTrending = async () => {
  // eslint-disable-next-line max-len
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY_VALENTIN}&limit=${TRENDING_LIMIT}`;

  try {
    const data = await fetchRequest(url);
    return data;
  } catch (error) {
    console.error('Error getting trending gifs:', error);
  }
};

/**
 * Fetches data on one specific gif
 * @async
 * @param {String} gifID: ID of the gif to retrieve via the GIPHY API
 * @return {Promise} the data for the GIF organized in an object
 */
export const fetchGifFromID = async (gifID) => {
  const url = `https://api.giphy.com/v1/gifs/${gifID}?api_key=${API_KEY_ILIA}`;

  try {
    const data = await fetchRequest(url);
    return data;
  } catch (error) {
    console.error('Error getting gif:', error);
  }
};

/**
 * Fetches data on a random gif
 * @async
 * @return {Promise} the data for the GIF organized in an object
 */
export const fetchRandom = async () => {
  // eslint-disable-next-line max-len
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY_VALENTIN}`;

  try {
    const data = await fetchRequest(url);
    return data;
  } catch (error) {
    console.error('Error getting gif:', error);
  }
};

/**
 * Fetches data on multiple gifs given their IDs
 * @param {String} gifIDs: a comma-separated list of IDs of gifs to retrieve
 * @return {Promise} resolves to array of objects
 * containing data for individual gifs
 */
export const fetchGifsFromIDs = async (gifIDs) => {
  if (!gifIDs || gifIDs === '') {
    return;
  }

  // eslint-disable-next-line max-len
  const url = `https://api.giphy.com/v1/gifs?api_key=${API_KEY_VALENTIN}&ids=${gifIDs}`;

  try {
    const data = await fetchRequest(url);
    return data;
  } catch (error) {
    console.error('Error getting gifs:', error);
  }
};
