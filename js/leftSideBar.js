/**
 * addEventListenerLeftSideBar
 * Add Event Lsitener to left sidebar buttons used to create shape
 */
function addEventListenerLeftSideBar(sv) {
	let allShapesBtn = document.querySelectorAll('.sidebar-shape');
	// Add event handler for each button
	allShapesBtn.forEach((button, index) => {
		button.addEventListener('click', () => {
			let clickedShape = button.getAttribute('title');

			let elem = new sv.ShapesConstruct[clickedShape]({ sv: sv.sv });
			// 
			elem.create();

			// Add event listener to shape to change property by and on right sidebar
			shapeEventListener(elem.getElement());
			sv.shapeList.push(elem.getElement());
		});
	});
}

// Kunai shape select garey vaney RIGHT sidebar ma tesko property aunu paryo
function shapeEventListener(shape) {
	shape.addEventListener('click', () => {
		// Uncheck if previously selected shapes if any
		if (selectedShape) {
			resetControls();
		}

		selectedShape = shape;
		
		// Get bounding box  of the actual shape not the whole shape container
		let { x, y, width, height } = selectedShape.querySelector('.actual-shape').getBBox();

		// Draw Bounding box
		let boundingBox = selectedShape.firstChild;
		boundingBox.setAttributeNS(null, 'x', x);
		boundingBox.setAttributeNS(null, 'y', y);
		boundingBox.setAttributeNS(null, 'width', width);
		boundingBox.setAttributeNS(null, 'height', height);

		drawControls(x, y, width, height);
		populateRightSideBar(shape);
	});
}

function populateRightSideBar(shape) {
	// Populate RIGHT ko sidebar
	let filledCheck = document.getElementById('fill-status');
	let pickedColor = document.getElementById('color-picker');

	// Scale Value
	let width_ = document.getElementById('width');
	let height_ = document.getElementById('height');
	// Translate Value
	let left = document.getElementById('left');
	let top = document.getElementById('top');
	// Rotate Value
	let rotation = document.getElementById('rotate');

	// Change fill check box and color picker color
	filledCheck.checked = shape.getAttributeNS(null, 'fill');
	pickedColor.value = shape.getAttributeNS(null, 'fill');
	

	let path = shape.querySelector('.svg-shape');
	let [w, h] = path.getAttributeNS(null, 'scale').split(' ');
	let [x, y] = shape.getAttributeNS(null, 'translate').split(' ');

	width_.value = w;
	height_.value = h;
	left.value = parseFloat(x).toFixed(2);
	top.value = parseFloat(y).toFixed(2);
	rotation.value = shape.getAttributeNS(null, 'rotate');

	// Selected Font 
	let selectedFont = document.getElementById('fonts');
	let currentFont = shape.querySelector('.shape-text').classList[1].split("-").slice(-1)[0];
	let fontIndex = 0;

	for(let i = 0; i < selectedFont.length; i++){
		if(selectedFont.options[i].value == currentFont){
			fontIndex = i;
			break;
		};
	}
	// Change selected index in right side bar
	selectedFont.selectedIndex = fontIndex;

}

function drawControls(x, y, width, height) {
	let points = [
		[x - 10, y - 10], // NW
		[x + width / 2, y - 10], // N
		[x + width + 10, y - 10], // NE

		[x - 10, y + height / 2], // W
		[x + width + 10, y + height / 2], // E

		[x - 10, y + height + 10], // SW
		[x + width / 2, y + height + 10], // S
		[x + width + 10, y + height + 10], // SE
	];
	// Draw controls

	// let rotateButton = selectedShape.querySelector('.rotate-button');
	// 
	// rotateButton.setAttributeNS(null, 'style', 'visibility: visible;');
	// rotateButton.setAttributeNS(null, 'transform', `translate(${x} ${y})`)

	let controlButtons = selectedShape.querySelectorAll('.resize-button');
	for (let i = 0; i < 8; i++) {
		let controlButton = controlButtons[i];
		let [x, y] = points[i];
		controlButton.setAttributeNS(null, 'cx', x);
		controlButton.setAttributeNS(null, 'cy', y);
		controlButton.setAttributeNS(null, 'rx', '5');
		controlButton.setAttributeNS(null, 'ry', '5');
	}
}

function resetControls() {
	// Draw Bounding box
	let boundingBox = selectedShape.firstChild;

	boundingBox.removeAttributeNS(null, 'x');
	boundingBox.removeAttributeNS(null, 'y');
	boundingBox.removeAttributeNS(null, 'width');
	boundingBox.removeAttributeNS(null, 'height');
	// Reset controls
	let controlButtons = selectedShape.querySelectorAll('.resize-button');
	for (let i = 0; i < 8; i++) {
		let controlButton = controlButtons[i];
		controlButton.removeAttributeNS(null, 'cx');
		controlButton.removeAttributeNS(null, 'cy');
		controlButton.removeAttributeNS(null, 'rx');
		controlButton.removeAttributeNS(null, 'ry');
	}

	// selectedShape = null;
}

let selectedShape = null;
