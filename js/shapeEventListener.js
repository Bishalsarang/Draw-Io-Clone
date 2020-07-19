/**
 * 
 * @param {*} shape 
 */
function shapeEventListener(shape) {
	// TODO: IF mouse is hovered on shape, connector button
	shape.addEventListener('mouseover', () => {});
   shape.addEventListener('click', selectShape);

   function selectShape(event){
      // Uncheck if previously selected shapes if any
		if (selectedShape) {
			resetControls();
		}

		selectedShape = shape;
		// Get bounding box  of the actual shape not the whole shape container
		let { x, y, width, height } = selectedShape
			.querySelector('.actual-shape')
			.getBBox();

		drawControls(x, y, width, height);
		populateRightSideBar(shape);
   }
}

function outsideClickEventListener(sv) {
	sv.sv.addEventListener('click', (e) => {
		let clickedElement = e.target;

		// Reset selected
		if (
			clickedElement.classList.contains('background-grid') ||
			clickedElement.classList.contains('drawing-area')
		) {
			resetControls();
		}
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
	let currentFont = [...textArea.classList].filter((class_) => {
		return class_.includes('font');
	});
	// font class is in the form font-default
	currentFont = currentFont[0].split('-').slice(-1)[0];
	let fontIndex = 0;

	for (let i = 0; i < selectedFont.length; i++) {
		if (selectedFont.options[i].value == currentFont) {
			fontIndex = i;
			break;
		}
	}
	// Change selected index in right side bar
	selectedFont.selectedIndex = fontIndex;

	// Bold Italics Underline
	let isBold = textArea.classList.contains('text-bold');
	let boldButton = document.getElementById('bold-btn');
	isBold
		? boldButton.classList.add('btn-active')
		: boldButton.classList.remove('btn-active');

	let isItalics = textArea.classList.contains('text-italics');
	let italicsButton = document.getElementById('italics-btn');
	isItalics
		? italicsButton.classList.add('btn-active')
		: italicsButton.classList.remove('btn-active');

	let isUnderline = textArea.classList.contains('text-underline');

	let underlineButton = document.getElementById('underline-btn');

	isUnderline
		? underlineButton.classList.add('btn-active')
		: underlineButton.classList.remove('btn-active');

	// FOnt Size Inputbox
	let fontSizeInput = document.getElementById('font-size');
	fontSizeInput.value = parseInt(getComputedStyle(textArea).fontSize);
}

