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
			// console.log("create", elem.getElement().getBBox());
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
		let { x, y, width, height } = selectedShape.getBBox();
	  
		// let actualShape = selectedShape.querySelector('.svg-shape');
		// console.log("Actual", actualShape.getBBox());
		// Draw Bounding box
		let boundingBox = selectedShape.firstChild;
		boundingBox.setAttributeNS(null, 'x', x);
		boundingBox.setAttributeNS(null, 'y', y);
		boundingBox.setAttributeNS(null, 'width', width);
		boundingBox.setAttributeNS(null, 'height', height);

		drawControls(x, y, width, height);

		// Populate RIGHT ko sidebar
		let filledCheck = document.getElementById('fill-status');
		let pickedColor = document.getElementById('color-picker');
		let rotation = document.getElementById('rotate');
      let width_ = document.getElementById('width');
      let height_ = document.getElementById('height');

		// Change fill check box and color picker color
		filledCheck.checked = shape.getAttributeNS(null, 'fill');
		pickedColor.value = shape.getAttributeNS(null, 'fill');
      rotation.value = shape.getAttributeNS(null, 'rotate');
      
      let path = shape.querySelector('.svg-shape');
      let [w, h] = path.getAttributeNS(null, 'scale').split(' ');

      console.log(h);
      width_.value = w;
      height_.value = h;
      
	});
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
	// console.log(selectedShape);
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
