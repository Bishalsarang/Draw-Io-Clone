/**
 * makeDraggable
 * @param {SV} sv SVG drawing area
 * Add draggable property to shapes drawn
 */
function makeDraggable(sv) {
	sv.sv.addEventListener('mousedown', startDrag);
	sv.sv.addEventListener('mousemove', drag);
	sv.sv.addEventListener('mouseup', endDrag);
	sv.sv.addEventListener('mouseleave', endDrag);

	function getMousePosition(evt) {
		let CTM = sv.sv.getScreenCTM();
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d,
		};
	}

	let selectedElement, offset, transform;

	function initialiseDragging(evt) {
		offset = getMousePosition(evt);

		// Make sure the first transform on the element is a translate transform
		var transforms = selectedElement.transform.baseVal;

		if (
			transforms.length === 0 ||
			transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
		) {
			// Create an transform that translates by (0, 0)
			var translate = sv.sv.createSVGTransform();
			translate.setTranslate(0, 0);
			selectedElement.transform.baseVal.insertItemBefore(translate, 0);
		}

		// Get initial translation
		transform = transforms.getItem(0);
		offset.x -= transform.matrix.e;
		offset.y -= transform.matrix.f;
	}

	function startDrag(evt) {
		
		// IF we are clicking control buttons don't trigger drag. Separately handle the event inside handle.js
		if(evt.target.classList.contains('resize-button')){
			return;
		}
		// FOr group <g></g> tag, the mouse selects the child node.
		// SO we find the parents
		if (evt.target.parentNode.classList.contains('draggable-group')) {
			selectedElement = evt.target.parentNode;
			initialiseDragging(evt);
		}
		// Sometimes we may select the actual path or shape of svg.
		// In that case we check for grandparent
		else if (
			evt.target.parentNode.parentNode.classList.contains('draggable-group')
		) {
			selectedElement = evt.target.parentNode.parentNode;
			initialiseDragging(evt);
		} else {
			console.log('CLicked bahira', selectedElement, selectedShape);
			//  if(selectedShape){ resetControls()};
		}
	}

	function drag(evt) {
		// let coord = getMousePosition(evt);
		// 	console.log("Move", coord.x - offset.x, coord.y - offset.y);
		if (selectedElement) {
			evt.preventDefault();
			let coord = getMousePosition(evt);
			transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
			selectedElement.setAttributeNS(
				null,
				'translate',
				coord.x - offset.x + ' ' + (coord.y - offset.y)
			);
		}
	}

	function endDrag(evt) {
		console.log(selectedElement);
		if (selectedElement) {
			let newTransformation = selectedElement.getAttributeNS(
				null,
				'transform'
			);
			selectedElement.removeAttributeNS(null, 'transform');

			selectedElement.setAttribute('transform', newTransformation);
		}
		selectedElement = false;
	}
}
