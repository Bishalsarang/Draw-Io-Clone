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
	addEventListenerRightSideBar();
	shapeDeleteEventListener();

};

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
