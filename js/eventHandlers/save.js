/**
 * save.js
 * This files containe event handlers related to exporting diagrams and saving progress
 */

/**
 *
 * @param {object} sv
 */
function saveEventHandler(svgObject) {
  downloadEventListener(svgObject);
  saveProgressEventListener(svgObject);
}

/**
 * downloadButton onClick
 */
function downloadEventListener(svgObject) {
  let downloadButton = $('.btn-save');
  let downloadLink = $('.download-link');

  downloadButton.addEventListener('click', (e) => {
    // Unselect if any shape is selected
    resetControls();
    // Remove grid from output
    removeGrid(svgObject.sv);
    let exportFileType = '';
    document.getElementsByName('export-extension').forEach((option) => {
      if (option.checked) {
        exportFileType = option.value;
      }
    });
    svgObject.svg2img(downloadLink, exportFileType);
    // Add grid back after export
    addGrid(svgObject.sv);
  });
}

/**
 * Listen for click event to save progress
 */
function saveProgressEventListener(svgObject) {
  let saveProgress = $('.btn-save-progress');

  // If save Progress is clicked
  saveProgress.addEventListener('click', (e) => {
    // Unselect if any shape is selected before saving the state
    resetControls();
    let currentTimeStamp = getCurrentTimeStamp();
    let currentSignature = {};

    currentSignature[currentTimeStamp] = svgObject.sv.innerHTML;
    localStorage.setItem(
      'draw-io-' + currentTimeStamp,
      JSON.stringify(currentSignature)
    );
  });
}
