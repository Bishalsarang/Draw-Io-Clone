import { CustomShape } from './components/CustomShape.js';
import { Connector } from './components/Connector.js';

class SV {
	constructor(selector) {
		this.sv = document.querySelector(selector);
		setSVGAttribute(
			this.sv,
			'viewBox',
			'0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT
		);

		// Shape and COnnector Constructors
		this.ShapesConstruct = {
			CustomShape: CustomShape,
			Connector: Connector,
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
			if (type == 'png') {
				imgsrc = canvas
					.toDataURL('image/png', 1)
					.replace('image/png', 'image/octet-stream');
					downloadLink.setAttribute('download', 'image.png');
			}
			downloadLink.href = imgsrc;
			downloadLink.click();
		};
	}
}

let sv;


window.onload = function () {
	sv = new SV('.drawing-area');

	// If some drafts has been saved
	if (hasPreviousSavedState()) {
		// SHow Draft Selector
		showDraftSelector(sv.sv);
	} else {
		addGrid(sv.sv);
	}

	// Show shape info on hovering shape on left sidebar
	sideBarShapeHoverEventListener(sv);
	addEventListenerLeftSideBar(sv);
	makeDraggable(sv);

	addEventListenerRightSideBar();
	keyBoardEventListener(sv);
	outsideClickEventListener(sv);
	saveProgressEventListener();
	downloadEventListener();
};

function hasPreviousSavedState() {
	return localStorage.length;
}

/**
 * downloadButton onClick
 */
function downloadEventListener() {
	let downloadButton = document.querySelector('.btn-save');
	let downloadLink = document.querySelector('.download-link');

	downloadButton.addEventListener('click', (e) => {
		// Unselect if any shape is selected
		resetControls();
		// Remove grid from output
		removeGrid(sv.sv);
		let exportFileType = '';
		document.getElementsByName('export-extension').forEach((option) => {
			if (option.checked) {
				exportFileType = option.value;
			}
		});
		sv.svg2img(downloadLink, exportFileType);
		// Add grid back after export
		addGrid(sv.sv);
	});
}

// function deleteShape(sv, selectedShape) {
// 	sv.removeChild(selectedShape);
// }

// function copyShape(sv, selectedShape) {
// 	copiedShape = selectedShape.cloneNode(true);
// }

// function pasteShape(sv){
// 	sv.append(copiedShape);
// 	shapeEventListener(copiedShape);

// 	// Since all the resize buttons are already drawn, add event handler to resize buttons
// 	document.querySelectorAll('.resize-button').forEach((element) => {
// 		let id = element.id;
// 		handleResize(sv, element, id);
// 	});
// }

// /**
//  * shapeDeleteEventListener
//  * Listen if delete key is pressed and remove if any shape is deleted
//  */
// function keyBoardEventListener() {
// 	window.addEventListener('keydown', (e) => {
// 		if (selectedShape) {
// 			// Delete Selected Shape on delete key dowm
// 			if (e.code == 'Delete') {
// 				deleteShape(sv.sv, selectedShape);
// 			}

// 			let c = e.keyCode;
// 			let ctrlDOwn = e.ctrlKey || e.metaKey; // Mac SUpport
// 			// Copy Shape on CTRL + C
// 			if (ctrlDOwn && c == 67) {
// 				copyShape(sv.sv, selectedShape);
// 				ctrlC = true;
// 			}

// 			// Paste Shape
// 			if (ctrlDOwn && c == 86) {
// 				pasteShape(sv.sv);
// 				ctrlC = false;
// 			}
// 		}
// 	});
// }

/**
 * Listen for click event to save progress
 */
function saveProgressEventListener() {
	let saveProgress = document.querySelector('.btn-save-progress');

	// If save Progress is clicked
	saveProgress.addEventListener('click', (e) => {
		// Unselect if any shape is selected before saving the state
		resetControls();
		let currentTimeStamp = getCurrentTimeStamp();
		let currentSignature = {};
		// localStorage.clear();
		currentSignature[currentTimeStamp] = sv.sv.innerHTML;
		localStorage.setItem("draw-io-" + currentTimeStamp, JSON.stringify(currentSignature));
	});
}
