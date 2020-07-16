import { CustomShape } from './components/CustomShape.js';
import { Handle } from './components/handle.js';

class SV {
	constructor(selector) {
		this.sv = document.querySelector(selector);
		this.sv.style.height = SVG_HEIGHT;
		this.sv.style.width = SVG_WIDTH;
		setSVGAttribute(this.sv, 'viewBox', '0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT)
		// this.sv.setAttributeNS(
		// 	null,
		// 	'viewBox',
		// 	'0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT
		// );
		this.shapeList = [];
		this.ShapesConstruct = {
			CustomShape: CustomShape,
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
	addGrid();

	if (hasPreviousSavedState()) {
		if (
			confirm(
				'Are you sure you want to continue the previous saved diagram? '
			)
		) {
			loadPreviousState();
			sv.sv.querySelectorAll('.draggable-group').forEach((element) => {
				// Enable EVents on click to draw boundary box, resizebuttons
				shapeEventListener(element);
		});
		}
		// Since all the resize buttons are already drawn, add event handler to resize buttons
		document.querySelectorAll('.resize-button').forEach((element) => {
			let id = element.id;
			handleResize(sv.sv, element, id);
		});
	}

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

function loadPreviousState() {
	// Load from previous state
	let lastTimeStamp = Object.keys(localStorage)[0];
	let previousState = JSON.parse(localStorage.getItem(lastTimeStamp));
	
	sv.sv.innerHTML = Object.values(previousState)[0];
}

/**
 *
 */
function addGrid() {
	let defElement = document.createElementNS(SVGNS, 'defs');
	let patternSmallGrid = document.createElementNS(SVGNS, 'pattern');
	setSVGAttributes(patternSmallGrid, {
		id: 'tenthGrid',
		width: '10',
		height: '10',
		patternUnits: 'userSpaceOnUse',
	});

	let pathSmallGrid = document.createElementNS(SVGNS, 'path');
	setSVGAttributes(pathSmallGrid, {
		d: 'M 10 0 L 0 0 0 10',
		fill: 'none',
		stroke: 'silver',
		'stroke-width': '0.5',
	});

	patternSmallGrid.appendChild(pathSmallGrid);
	defElement.appendChild(patternSmallGrid);

	let patternLargeGrid = document.createElementNS(SVGNS, 'pattern');
	setSVGAttributes(patternLargeGrid, {
		id: 'grid',
		width: '100',
		height: '100',
		patternUnits: 'userSpaceOnUse',
	});

	let pathLargeGrid = document.createElementNS(SVGNS, 'path');
	setSVGAttributes(pathLargeGrid, {
		d: 'M 100 0 L 0 0 0 100',
		fill: 'none',
		stroke: 'gray',
		'stroke-width': '1',
	});

	let rectLargeGrid = document.createElementNS(SVGNS, 'rect');
	setSVGAttributes(rectLargeGrid, {
		width: '100',
		height: '100',
		fill: 'url(#tenthGrid)',
	});

	patternLargeGrid.appendChild(rectLargeGrid);
	patternLargeGrid.appendChild(pathLargeGrid);
	defElement.appendChild(patternLargeGrid);

	let gridRect = document.createElementNS(SVGNS, 'rect');
	setSVGAttributes(gridRect, {
		width: '100%',
		height: '100%',
		fill: 'url(#grid)',
		class: 'background-grid'
	});
	sv.sv.appendChild(defElement);
	sv.sv.appendChild(gridRect);
}

/**
 * downloadButton onClick
 */
function downloadEventListener() {
	let downloadButton = document.querySelector('.btn-save');
	let downloadLink = document.querySelector('.download-link');

	downloadButton.addEventListener('click', (e) => {
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
		localStorage.clear();
		currentSignature[currentTimeStamp] = sv.sv.innerHTML;
		localStorage.setItem(currentTimeStamp, JSON.stringify(currentSignature));
	});
}
