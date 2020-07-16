
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

			let elem = new sv.ShapesConstruct["CustomShape"]({ sv: sv.sv, ...ShapeInfo[clickedShape]});
			
			elem.create();

			// Add event listener to shape to change property by and on right sidebar
			shapeEventListener(elem.getElement());
			sv.shapeList.push(elem.getElement());
		});
	});
}


function outsideClickEventListener(sv){
	sv.sv.addEventListener('click', (e) => {
		let clickedElement = e.target;
		
		// Reset selected
		if(clickedElement.classList.contains('background-grid') || clickedElement.classList.contains('drawing-area')){		
			resetControls();
		}
	});
}

// Kunai shape select garey vaney RIGHT sidebar ma tesko property aunu paryo
function shapeEventListener(shape) {
	// IF mouse is hovered on shape, connector button
	shape.addEventListener('mouseover', () =>{
		
	})
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
		setSVGAttributes(boundingBox, {
			x: x,
			y: y,
			width: width,
			height: height,
		});

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

	let textArea = shape.querySelector('.shape-text');
	let currentFont = [... textArea.classList].filter((class_) => {
		return class_.includes('font');
	});
	// font class is in the form font-default
	currentFont = currentFont[0].split('-').slice(-1)[0];
	let fontIndex = 0;

	for(let i = 0; i < selectedFont.length; i++){
		if(selectedFont.options[i].value == currentFont){
			fontIndex = i;
			break;
		};
	}
	// Change selected index in right side bar
	selectedFont.selectedIndex = fontIndex;

	

	// Bold Italics Underline
	let isBold = textArea.classList.contains('text-bold');
	let boldButton = document.getElementById('bold-btn');
	isBold ? boldButton.classList.add('btn-active'): 	boldButton.classList.remove('btn-active');
	
	let isItalics = textArea.classList.contains('text-italics');
	let italicsButton = document.getElementById('italics-btn');
	isItalics ? italicsButton.classList.add('btn-active'): 	italicsButton.classList.remove('btn-active');

	let isUnderline = textArea.classList.contains('text-underline');
	
	let underlineButton = document.getElementById('underline-btn');
	
	isUnderline ? underlineButton.classList.add('btn-active'): 	underlineButton.classList.remove('btn-active');
	
	// FOnt Size Inputbox
	let fontSizeInput = document.getElementById('font-size');
	fontSizeInput.value = parseInt(getComputedStyle(textArea).fontSize);

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

	 let rotateButton = selectedShape.querySelector('.rotate-button');
	// 
	rotateButton.setAttributeNS(null, 'style', 'visibility: visible;');
	rotateButton.setAttributeNS(null, 'transform', `translate(${x-40} ${y-40})`)

	// Position Text
	let textBoxParent = selectedShape.querySelector('.text-box-parent');
	textBoxParent.setAttributeNS(null, 'width', width);
	textBoxParent.setAttributeNS(null, 'height', height / 2 + 10 )
	textBoxParent.setAttributeNS(null, 'x', x - 10 + 8);
	textBoxParent.setAttributeNS(null, 'y', y + height / 2 - 10 );

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
	if(selectedShape){
		let rotateButton = selectedShape.querySelector('.rotate-button');
		setSVGAttributes(rotateButton, {
			style: 'visibility: hidden'
		});
		removeSVGAttributes(rotateButton, ['transform']);

		// Bounding box
		let boundingBox = selectedShape.firstChild;
		removeSVGAttributes(boundingBox, [
			'x',
			'y',
			'width',
			'height',
		]);
		
		// Reset controls
		let resizeButtons = selectedShape.querySelectorAll('.resize-button');
		for (let i = 0; i < resizeButtons.length; i++) {
			let resizeButton = resizeButtons[i];
			removeSVGAttributes(resizeButton, [
				'cx',
				'cy',
				'rx',
				'ry',
			])
		}
		// Unselect the selected shape
		// selectedShape = null;
	}
	
}

let selectedShape = null;
