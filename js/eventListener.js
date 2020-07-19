/**
 * ALl the Event Listeners
 */


 // Download
 // COpy
 // Paste
 // Delete

 class EventListener{
    constructor(sv){
      this.sv = sv;
    }

    downloadEventListener(){
      let downloadButton = document.querySelector('.btn-save');
      let downloadLink = document.querySelector('.download-link');
   
      downloadButton.addEventListener('click', (e) => {
         // Unselect if any shape is selected
         resetControls();
         let exportFileType = '';
         document.getElementsByName('export-extension').forEach((option) => {
            if (option.checked) {
               exportFileType = option.value;
            }
         });
         sv.svg2img(downloadLink, exportFileType);
      });

    }
 }