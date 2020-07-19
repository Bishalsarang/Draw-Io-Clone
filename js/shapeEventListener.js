/**
 *
 * @param {object} shape
 */
function shapeEventListener(shape) {
	// TODO: IF mouse is hovered on shape, connector button
	shape.addEventListener('mouseover', () => {});
	shape.addEventListener('click', selectShape);

	function selectShape(event) {
		// Unselect if shape is selected
		if (selectedShape) {
			resetControls();
		}

		// Set current shape as selected shape
      selectedShape = shape;
   
		// Get bounding box  of the actual shape not the whole shape container
		let { x, y, width, height } = selectedShape
			.querySelector('.actual-shape')
			.getBBox();

		// Draw Controls
		drawControls(x, y, width, height);
		// Reflect changes on right sidebar properties
		populateRightSideBar(shape);
	}
}

/**
 *
 * @param {*} svgObject
 */
function outsideClickEventListener(svgObject) {
	svgObject.sv.addEventListener('click', (e) => {
		let clickedElement = e.target;

		// If clicked on background of drawing area
		if (
			clickedElement.classList.contains('background-grid') ||
			clickedElement.classList.contains('drawing-area')
		) {
			resetControls();
		}
	});
}

/**
 * Update Fill color properties on right side bar
 * @param {object} shape
 */
function updateFillColorStatus(shape) {
	let filledCheck = $('#fill-status');
	let pickedColor = $('#color-picker');
	let fillOpacity = $('#opacity');

	// Change fill check box and color picker color
	filledCheck.checked = getSVGAttribute(shape, 'fill');
	pickedColor.value = getSVGAttribute(shape, 'fill');
	fillOpacity.value = getSVGAttribute(shape, 'fill-opacity') * 100;
}

/**
 * Update Stroke properties on right side bar
 * @param {object} shape
 */
function updateLineProperties(shape) {
	let lineStatus = $('#line-status');
	let lineTypeSelector = $('#line-type');
	let lineWidth = $('#line-width');
	let lineColor = $('#stroke-color-picker');

	lineStatus.checked = getSVGAttribute(shape, 'stroke');
	lineWidth.value = parseFloat(getSVGAttribute(shape, 'stroke-width'));
	lineColor.value = getSVGAttribute(shape, 'stroke');
}

/**
 *
 * @param {*} shape
 */
function updatePositionProperties(shape) {
	// Translate Value
	let left = $('#left');
	let top = $('#top');

	let [x, y] = getSVGAttribute(shape, 'translate').split(' ');
	left.value = parseFloat(x).toFixed(2);
	top.value = parseFloat(y).toFixed(2);
}

/**
 *
 * @param {*} shape
 */
function updateScaleProperties(shape) {
	let actualShape = shape.querySelector('.svg-shape');

	let scaleX = $('#width');
	let scaleY = $('#height');

	let [w, h] = getSVGAttribute(actualShape, 'scale').split(' ');

	scaleX.value = w;
	scaleY.value = h;
}

/**
 *
 * @param {*} shape
 */
function updateRotationProperties(shape) {
	// Rotate Value
	let rotation = $('#rotate');
	rotation.value = getSVGAttribute(shape, 'rotate');
}

/**
 *
 * @param {*} textArea
 */
function updateCurrentFont(textArea) {
	// Selected Font
	let selectedFont = $('#fonts');
	
	let currentFont = [...textArea.classList].filter((class_) => {
		return class_.includes('font');
	});
	// font class is in the form font-default
	// So this gives default
	currentFont = currentFont[0].split('-').slice(-1)[0];
	let fontIndex = 0;

	for (let i = 0; i < selectedFont.length; i++) {
		if (selectedFont.options[i].value === currentFont) {
			fontIndex = i;
			break;
		}
	}
	// Change selected index in right side bar
	selectedFont.selectedIndex = fontIndex;
}

/**
 *
 * @param {*} textArea
 * @param {*} fontStyleClass
 * @param {*} fontStyleButtonSelector
 */
function updateFontStyle(textArea, fontStyleClass, fontStyleButtonSelector) {
	let isFontStyleApplied = textArea.classList.contains(fontStyleClass);
	let button = $(fontStyleButtonSelector);

	isFontStyleApplied
		? button.classList.add('btn-active')
		: button.classList.remove('btn-active');
}

/**
 *
 * @param {*} textArea
 */
function updateFontSize(textArea) {
	let fontSizeInput = $('#font-size');

	fontSizeInput.value = parseInt(getCSSAttribute(textArea, 'font-size'));
}

function updateFontColor(textArea) {
	let fontColor = $('#font-color');
	fontColor.value = getCSSAttribute(textArea, 'color');
}

/**
 *
 * @param {*} shape
 */
function updateFontProperties(shape) {
	let textArea = shape.querySelector('.shape-text');

	// Update font-family
	updateCurrentFont(textArea);

	// Update font style
	updateFontStyle(textArea, 'text-bold', '#bold-btn'); // Toggle bold status
	updateFontStyle(textArea, 'text-italics', '#italics-btn'); // Toggle italics status
	updateFontStyle(textArea, 'text-underline', '#underline-btn'); // Toggle underline status

	// Update Font Size
	updateFontSize(textArea);

	// Update Font Color
	updateFontColor(textArea);
}

/**
 *
 * @param {*} shape
 */
function populateRightSideBar(shape) {
	updateFontProperties(shape); // Change Font Properties
	updateLineProperties(shape); // Change line properties
	updateScaleProperties(shape); // Change Scale Properties
	updateFillColorStatus(shape); // Change fill color properties
	updatePositionProperties(shape); // Change Position Properties
	updateRotationProperties(shape); // Change Rotataion Properties
}
