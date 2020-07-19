/**
 *
 * @param {object} boundingBox
 * @param {number} x boundingBox topLeft X
 * @param {number} y boundingBox topLeft Y
 * @param {number} width boundingBox Width
 * @param {number} height boundingBox Height
 */
function drawBoundingBox(boundingBox, x, y, width, height) {
	setSVGAttributes(boundingBox, {
		x: x,
		y: y,
		width: width,
		height: height,
		style: 'visibility: visible',
	});
}

/**
 *
 * @param {object} rotateButton
 * @param {number} x
 * @param {number} y
 */
function drawRotateButton(rotateButton, x, y) {
	setSVGAttributes(rotateButton, {
		style: 'visibility: visible;',
		transform: `translate(${x - ROTATE_BUTTON_OFFSET_X} ${
			y - ROTATE_BUTTON_OFFSET_Y
		})`,
	});
}

/**
 *
 * @param {object} textBoxParent
 * @param {number} x boundingBox topLeft X
 * @param {number} y boundingBox topLeft Y
 * @param {number} width boundingBox Width
 * @param {number} height boundingBox Height
 */
function drawTextBox(textBoxParent, x, y, width, height) {
	setCSSAttributes(textBoxParent, {
		width: width,
		height: height / 2 + 10,
		x: x - 2,
		y: y + height / 2 - 10,
	});
}

/**
 * 
 * @param {object} resizeButtons 
 * @param {number} x boundingBox topLeft X
 * @param {number} y boundingBox topLeft Y
 * @param {number} width boundingBox Width
 * @param {number} height boundingBox Height
 */
function drawResizeButtons(resizeButtons, x, y, width, height) {
	let resizeButtonDiameter = RESIZE_BUTTON_RADIUS * 2;
	let points = [
		[x - resizeButtonDiameter, y - resizeButtonDiameter], // NW
		[x + width / 2, y - resizeButtonDiameter], // N
		[x + width + resizeButtonDiameter, y - resizeButtonDiameter], // NE

		[x - resizeButtonDiameter, y + height / 2], // W
		[x + width + resizeButtonDiameter, y + height / 2], // E

		[x - resizeButtonDiameter, y + height + resizeButtonDiameter], // SW
		[x + width / 2, y + height + resizeButtonDiameter], // S
		[x + width + resizeButtonDiameter, y + height + resizeButtonDiameter], // SE
	];

	for (let i = 0; i < 8; i++) {
		let resizeButton = resizeButtons[i];
		let [x, y] = points[i];
		setSVGAttributes(resizeButton, {
         style: 'visibility: visible',
			cx: x,
			cy: y,
			rx: RESIZE_BUTTON_RADIUS,
			ry: RESIZE_BUTTON_RADIUS,
		});
	}
}

/**
 *
 * @param {number} x boundingBox topLeft X
 * @param {number} y boundingBox topLeft Y
 * @param {number} width boundingBox Width
 * @param {number} height boundingBox Height
 */
function drawControls(x, y, width, height) {
	// Draw Bounding Box
	let boundingBox = selectedShape.firstChild;
	drawBoundingBox(boundingBox, x, y, width, height);

	// Draw Rotate Button
	let rotateButton = selectedShape.querySelector('.rotate-button');
	drawRotateButton(rotateButton, x, y);

	// Draw Text Box
	let textBoxParent = selectedShape.querySelector('.text-box-parent');
	drawTextBox(textBoxParent, x, y, width, height);

	// Draw Resize Buttons
	let resizeButtons = selectedShape.querySelectorAll('.resize-button');
	drawResizeButtons(resizeButtons, x, y, width, height);
}

function resetControls() {
	if (selectedShape) {
      // Hide Rotate Button
		let rotateButton = selectedShape.querySelector('.rotate-button');
		setSVGAttributes(rotateButton, {
			style: 'visibility: hidden',
		});
		removeSVGAttributes(rotateButton, ['transform']);

		// Hide Bounding box
		let boundingBox = selectedShape.firstChild;
		setSVGAttributes(boundingBox, {
			style: 'visibility: hidden',
		});
		
		// Hide Resize button
		let resizeButtons = selectedShape.querySelectorAll('.resize-button');
      resizeButtons.forEach((resizeButton) => {
         setSVGAttribute(resizeButton, 'style', 'visibility: hidden');
      });
		// Unselect the selected shape
		// selectedShape = null;
	}
}