/**
 * Performs requests to the GIPHY API with a specified URL
 * containing the necessary parameters for the respective request
 * @param {String} url: contains the information about the particular request
 * @return {Promise} the data retrieved through the GIPHY API
 */
export const fetchRequest = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    const resultData = result.data;
    return resultData;
  } catch (error) {
    console.log('Something went wrong while retrieving data: ', error);
  }
};
