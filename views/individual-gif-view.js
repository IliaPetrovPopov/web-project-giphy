/**
 * HTML code for the 'display details' page of the application
 * @param {object} gif - the gif to be displayed
 * @return {String} the HTML template
 */
export const individualGifView = (gif) => {
  return `
    <div id='detailed-view'>
        <h1>Gif Details:</h1>
        <p><strong>Title: </strong>${gif.title || 'No title'}</p>
        <p><strong>Added: </strong> ${gif.import_datetime}</p>
        <p><strong>ID: </strong> ${gif.id}</p>
    </div>
  `;
};
