import { Circle } from './components/Circle.js';
import { Square } from './components/Square.js';
import { Ellipse } from './components/Ellipse.js';
import { Rectangle } from './components/Rectangle.js';
import { Diamond } from './components/Diamond.js';
import { RoundRectangle } from './components/RoundRectangle.js';
// import { Line } from './components/Line.js';

class SV {
	constructor(selector) {
		this.sv = document.querySelector(selector);
		this.sv.style.height = SVG_HEIGHT;
		this.sv.style.width = SVG_WIDTH;
		this.sv.setAttributeNS(
			null,
			'viewBox',
			'0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT
		);
		this.shapeList = [];
		this.ShapesConstruct = {
			Rectangle: Rectangle,
			RoundRectangle: RoundRectangle,
			Ellipse: Ellipse,
			Square: Square,
			Circle: Circle,
			Diamond: Diamond,
			// Line: Line,
		};
	}

	svg2img(el, type){
		var svg = document.getElementById('drawing-area');
		var xml = new XMLSerializer().serializeToString(svg);
		var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))

		var b64start = 'data:image/svg+xml;base64,';
		var image64 = b64start + svg64;
		
		// Create temporary img tag
		var img = document.createElement('img');
		img.setAttribute("src", image64);

		// Convert to canvas and draw image on canvas
		var canvas = document.createElement("canvas");
		canvas.width = SVG_WIDTH;
		canvas.height = SVG_HEIGHT;
		var ctx = canvas.getContext('2d');
		

		var imgsrc = image64.replace("image/svg", "image/octet-stream");
		el.setAttribute('download', "image.svg");
		img.onload = function(){
			ctx.drawImage(img, 0, 0);
			if(type == "png"){
				imgsrc = canvas.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");
				el.setAttribute('download', "image.png");
			}
			el.href = imgsrc;
			el.click();
		}

	}
}

let sv;
window.onload = function () {
	sv = new SV('#drawing-area');
	addEventListenerLeftSideBar(sv);
	makeDraggable(sv);
	addEventListenerRightSideBar();
	shapeDeleteEventListener();

};

let downloadButton = document.querySelector('.btn-save');
let downloadLink = document.querySelector('.download-link');

/**
 * downloadButton onClick
 */
downloadButton.addEventListener('click', (e) =>{
	let exportFileType = '';
	document.getElementsByName('export-extension').forEach((option) => {
	if(option.checked){
		exportFileType = option.value;
	}
	});
	sv.svg2img(downloadLink, exportFileType);
});

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

