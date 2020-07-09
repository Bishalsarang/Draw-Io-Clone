import { Rectangle } from './Rectangle.js';
import { RoundRectangle } from './RoundRectangle.js';
class SV {
	constructor(selector) {
		this.sv = document.querySelector(selector);

		this.sv.style.height = SVG_HEIGHT;
		this.sv.style.width = SVG_WIDTH;


		this.mapId
		this.shapeList = [];
		this.ShapesConstruct = {
			Rectangle: Rectangle,
			RoundRectangle: RoundRectangle,
		};

		this.eventHandler();
	}

	eventHandler() {}
}

let sv;
window.onload = function () {
	sv = new SV('#drawing-area');
};

let allShapesBtn = document.querySelectorAll('.sidebar-shape');
// Add event handler for each button
allShapesBtn.forEach((button, index) => {
	button.addEventListener('click', () => {
		let clickedShape = button.getAttribute('title');
		
		
		let elem = new sv.ShapesConstruct[clickedShape]();
		elem.create();

		sv.shapeList.push(elem.getElement());
		sv.sv.appendChild(elem.getElement());
	});
});


let selectedShape = null;
// Kunai shape select agrey vaney RIGHT sidebar ma tesko property aunu paryo
function listenDrawingArea(){
	document.querySelectorAll('#drawing-area > g').forEach((shape, index) => {
		shape.addEventListener('click', () => {
			selectedShape = shape;

			// Populate RIGHT ko sidebar
			let filledCheck = document.getElementById('fill-status');
			let pickedColor = document.getElementById('color-picker');

			// Change fill check box and color picker color
			filledCheck.checked = shape.getAttributeNS(null, 'fill');
			pickedColor.value = shape.getAttributeNS(null, 'fill');
		});
	});
}

// Listen to chaanges on drawing area every 100ms 
setInterval(listenDrawingArea, 100);


// Right Side ko kunai property ma click garera chnage garey left side ko selected object ma change hunu paryo
let pickedColor = document.getElementById('color-picker');
pickedColor.addEventListener('change', (e) =>{
	if(selectedShape){
		selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
	}
});


let filledCheck = document.getElementById('fill-status');
filledCheck.addEventListener('change', (e) => {
	// If selected shape xa vaney change the property
	if(selectedShape){
		if(filledCheck.checked){
			selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
			console.log("checked");
		}
		else{
			console.log("none");
			selectedShape.setAttributeNS(null, 'fill', 'none');
		}
	}
});


let gradientStatus = document.getElementById('gradient-status');
let gradientDirection = document.getElementById('gradient-direction');
let gradientColorPicker = document.getElementById('gradient-color-picker');

let lineStatus = document.getElementById('line-status');
let lineType = document.getElementById('line-type');
let lineWidth = document.getElementById('line-width');
lineWidth.addEventListener('change', (e) => {
	if(selectedShape){
		selectedShape.setAttributeNS(null, 'stroke-width', lineWidth.value)
	}

});
let opacity = document.getElementById('opacity');
opacity.addEventListener('change', (e) => {
	if(selectedShape){
		selectedShape.setAttributeNS(null, 'fill-opacity', parseInt(opacity.value) / 100);
	}
});