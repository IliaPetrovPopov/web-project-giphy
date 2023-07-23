import { API_KEY_SLAVENA, UPLOADED_GIFS } from '../common/constants.js';

/**
 * Uploads a gif from the user's file system to GIPHY
 * @async
 * @param {FormData} formData: the gif file data ready for upload
 */
export const uploadGif = async (formData) => {
  const response = await fetch(
      `https://upload.giphy.com/v1/gifs?api_key=${API_KEY_SLAVENA}`,
      {
        method: 'POST',
        body: formData,
      },
  );

  try {
    const result = await response.json();
    const gifID = result.data.id;

    // add ID to local storage
    const uploadedGifsStr = localStorage.getItem(UPLOADED_GIFS);
    let uploadedGifsArr;
    if (uploadedGifsStr === '') uploadedGifsArr = [];
    else uploadedGifsArr = uploadedGifsStr.split(',');
    uploadedGifsArr.push(gifID);
    localStorage.setItem(UPLOADED_GIFS, uploadedGifsArr.join(','));

    return gifID;
  } catch (error) {
    console.log('Something went wrong while uploading your gif: ', error);
  }
};
