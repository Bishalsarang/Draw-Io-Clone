import { CustomShape } from './components/CustomShape.js';
import {  Connector} from './components/Connector.js';

class SV {
	constructor(selector) {
		this.sv = document.querySelector(selector);
		setSVGAttribute(this.sv, 'viewBox', '0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT);
		this.shapeList = [];
		this.ShapesConstruct = {
			CustomShape: CustomShape,
			Connector: Connector,
		};
	}

	svg2img(el, type) {
		var svg = document.getElementById('drawing-area');
		var xml = new XMLSerializer().serializeToString(svg);
		var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))

		var b64start = 'data:image/svg+xml;base64,';
		var image64 = b64start + svg64;

		// Create temporary img tag
		var img = document.createElement('img');
		img.setAttribute('src', image64);

		// Convert to canvas and draw image on canvas
		var canvas = document.createElement('canvas');
		canvas.width = SVG_WIDTH;
		canvas.height = SVG_HEIGHT;
		var ctx = canvas.getContext('2d');

		var imgsrc = image64.replace('image/svg', 'image/octet-stream');
		el.setAttribute('download', 'image.svg');
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
			if (type == 'png') {
				imgsrc = canvas
					.toDataURL('image/png', 1)
					.replace('image/png', 'image/octet-stream');
				el.setAttribute('download', 'image.png');
			}
			el.href = imgsrc;
			el.click();
		};
	}
}

let sv;
window.onload = function () {
	sv = new SV('.drawing-area');
	if (hasPreviousSavedState()) {
			// SHow Draft Selector
			showDraftSelector(sv.sv);
	}
	else{
		addGrid(sv.sv)
	}

	sideBarShapeHoverEventListener(sv);
	addEventListenerLeftSideBar(sv);
	makeDraggable(sv);
	addEventListenerRightSideBar();
	shapeDeleteEventListener();
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
		let exportFileType = '';
		document.getElementsByName('export-extension').forEach((option) => {
			if (option.checked) {
				exportFileType = option.value;
			}
		});
		sv.svg2img(downloadLink, exportFileType);
	});
}

/**
 * shapeDeleteEventListener
 * Listen if delete key is pressed and remove if any shape is deleted
 */
function shapeDeleteEventListener() {
	window.addEventListener('keydown', (e) => {
		if (selectedShape) {
			if (e.code == 'Delete') {
				sv.sv.removeChild(selectedShape);
			}
		}
	});
}

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
		localStorage.setItem(currentTimeStamp, JSON.stringify(currentSignature));
	});
}
