import { CustomShape } from './components/CustomShape.js';
import { Connector } from './components/Connector.js';

class SVG {
  constructor(selector) {
	//   SVG Selector
    this.sv = $(selector);
    setSVGAttribute(this.sv, 'viewBox', '0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT);

    // Shape and COnnector Constructors
    this.ShapesConstruct = {
      CustomShape: CustomShape,
      Connector: Connector
    };
  }

  /**
   * Convert content of svg tag to .png or .svg
   * @param {*} downloadLink
   * @param {*} type
   */
  svg2img(downloadLink, type) {
    let xml = new XMLSerializer().serializeToString(this.sv);
    let svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))

    let b64start = 'data:image/svg+xml;base64,';
    let image64 = b64start + svg64;

    // Create temporary img tag
    let img = document.createElement('img');
    img.setAttribute('src', image64);

    // Convert to canvas and draw image on canvas
    let canvas = document.createElement('canvas');
    canvas.width = SVG_WIDTH;
    canvas.height = SVG_HEIGHT;

    let ctx = canvas.getContext('2d');

    let imgsrc = image64.replace('image/svg', 'image/octet-stream');
    downloadLink.setAttribute('download', 'image.svg');

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      if (type === 'png') {
        imgsrc = canvas
          .toDataURL('image/png', 1)
          .replace('image/png', 'image/octet-stream');
        downloadLink.setAttribute('download', 'image.png');
      }
      downloadLink.href = imgsrc;
      downloadLink.click();
    };
  }

  initialise() {
    // Show shape info on hovering shape on left sidebar
    sideBarShapeHoverEventListener(this);
    addEventListenerLeftSideBar(this);
    makeDraggable(this);

    addEventListenerRightSideBar();
    keyBoardEventListener(this);
    outsideClickEventListener(this);

    // Save and Export Event Handlers
    saveEventHandler(this);
  }
}

let sv;
window.onload = function () {
  sv = new SVG('.drawing-area');

  // If some drafts has been saved
  if (hasPreviousSavedState()) {
    // SHow Draft Selector
    showDraftSelector(sv.sv);
  } else {
    addGrid(sv.sv);
  }

  sv.initialise();
};
