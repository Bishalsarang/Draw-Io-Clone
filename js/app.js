import { Circle } from './components/Circle.js';
import { Square } from './components/Square.js';
import { Ellipse } from './components/Ellipse.js';
import { Rectangle } from './components/Rectangle.js';
import { Diamond } from './components/Diamond.js';
import { RoundRectangle } from './components/RoundRectangle.js';
import { Line } from './components/Line.js';

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
			Line: Line,
		};
	}
}

let sv;
window.onload = function () {
	sv = new SV('#drawing-area');
	addEventListenerLeftSideBar(sv);
	makeDraggable(sv);
	shapeDeleteEventListener();
};

function shapeDeleteEventListener() {
	window.addEventListener('keydown', (e) => {
		if (selectedShape) {
			if (e.code == 'Delete' || e.code == 'Backspace') {
				sv.sv.removeChild(selectedShape);
			}
		}
	});
}

// Right Side ko kunai property ma click garera chnage garey left side ko selected object ma change hunu paryo
let pickedColor = document.getElementById('color-picker');
pickedColor.addEventListener('change', (e) => {
	if (selectedShape) {
		selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
	}
});

let filledCheck = document.getElementById('fill-status');
filledCheck.addEventListener('change', (e) => {
	// If selected shape xa vaney change the property
	if (selectedShape) {
		if (filledCheck.checked) {
			selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
		} else {
			selectedShape.setAttributeNS(null, 'fill', 'none');
		}
	}
});

let lineColor = document.getElementById('stroke-color-picker');
lineColor.addEventListener('change', (e) => {
	if (selectedShape) {
		selectedShape.setAttributeNS(null, 'stroke', lineColor.value);
	}
});

let lineStatus = document.getElementById('line-status');
lineStatus.addEventListener('change', (e) => {
	if (selectedShape) {
		if (lineStatus.checked) {
			selectedShape.setAttributeNS(null, 'stroke', lineColor.value);
		} else {
			selectedShape.setAttributeNS(null, 'stroke', 'none');
		}
	}
});

let lineType = document.getElementById('line-type');
let lineWidth = document.getElementById('line-width');

lineWidth.addEventListener('change', (e) => {
	if (selectedShape) {
		selectedShape.setAttributeNS(null, 'stroke-width', lineWidth.value);
	}
});

let opacity = document.getElementById('opacity');
opacity.addEventListener('change', (e) => {
	if (selectedShape) {
		selectedShape.setAttributeNS(
			null,
			'fill-opacity',
			parseInt(opacity.value) / 100
		);
	}
});

let rotation = document.getElementById('rotate');
rotation.addEventListener('change', (e) => {
	if (selectedShape) {
		let translate = selectedShape.getAttributeNS(null, 'translate');
		let rotate = rotation.value;

		let newTransformation = `translate(${translate}) rotate(${rotate})`;

		selectedShape.setAttributeNS(null, 'translate', translate);
		selectedShape.setAttributeNS(null, 'rotate', rotate);

		selectedShape.setAttributeNS(null, 'transform', newTransformation);
	}
});

// Width Increased
width.addEventListener('change', (e) => {
	if (selectedShape) {
		// Scaling applies to actual paths only
		let w = document.getElementById('width');
		let widthValue = w.value;

		selectedShape.querySelectorAll('.svg-shape').forEach((path, index) => {
			let [_, heightValue] = path.getAttributeNS(null, 'scale').split(' ');
			console.log("new box", path.getBBox());
			let {x, y} = path.getBBox();
			path.setAttributeNS(null, 'scale', `${widthValue} ${heightValue}`);
			path.setAttributeNS(
				null,
				'transform',
				`scale(${widthValue} ${heightValue}) translate(${-x} ${-y})`
			);
		});
		resetControls();
	}
});

// Height Increased
height.addEventListener('change', (e) => {
	if (selectedShape) {
		// Scaling applies to actual paths only
		let h = document.getElementById('height');
		let heightValue = h.value;
		selectedShape.querySelectorAll('.svg-shape').forEach((path, index) => {
			let [widthValue, _] = path.getAttributeNS(null, 'scale').split(' ');
			let {x, y} = path.getBBox();
			path.setAttributeNS(null, 'scale', `${widthValue} ${heightValue}`);
			path.setAttributeNS(null, 'transform', `scale(${widthValue} ${heightValue}) translate(${-x} ${-y})`);
		});
		resetControls();
	}
});
