/**
 * ALl controls related to left side bar
 */

let selectedShape = null;

/**
 * Listen for hover events on sidebar shape by showing shape info
 * @param {object} sv svg drawing area element
 */
function sideBarShapeHoverEventListener(sv) {
	let leftSideBarShapes = document.querySelectorAll(
		'.sidebar-shape, .sidebar-connector'
	);

	// div to show shape information
	let showShapeInfo = document.querySelector('.show-shape-info');

	let showShapeInfoShapeName = showShapeInfo.querySelector('.shape-name');
	let showShapeInfoPreview = showShapeInfo.querySelector(
		'.show-shape-info-preview'
	);

	// For each sidebar shapes display shape info on hover
	leftSideBarShapes.forEach((sidebarShape) => {
		// Show Shape Info on Hover and hide on mouseout and click
		sidebarShape.addEventListener('mouseover', displayShapeInfo);
		sidebarShape.addEventListener('mouseout', hideShapeInfo);
		sidebarShape.addEventListener('click', hideShapeInfo);

		function displayShapeInfo(event) {
			let shapeGroup = sidebarShape.querySelector('g');

			// Display shapeInfo
			showShapeInfo.classList.remove('hide');
			// Name of the shape
			showShapeInfoShapeName.innerHTML = getHTMLAttribute(
				sidebarShape,
				'title'
			);

			// Display the shape on Shape Info preview by scaling
			showShapeInfoPreview.innerHTML = sidebarShape.innerHTML;

			shapeGroup = showShapeInfoPreview.querySelector('g');
			setSVGAttributes(shapeGroup, {
				transform: 'translate(180 10) scale(15 15)',
			});
		}

		function hideShapeInfo(event) {
			showShapeInfo.classList.add('hide');
		}
	});
}

/**
 * addEventListenerLeftSideBar
 * Add Event Listener to left sidebar buttons used to create shape
 * @param {object} svgObject svg object
 */
function addEventListenerLeftSideBar(svgObject) {
	// Select all shapes and connectors on left side bar
	let allShapesBtn = document.querySelectorAll(
		'.sidebar-shape, .sidebar-connector'
	);

	// Add event handler for each button
	allShapesBtn.forEach((button) => {
		button.addEventListener('click', () => {
			let clickedShape = button.getAttribute('title');
			let elem;
			// If it is a shape draw shape on svg
			if (getHTMLAttribute(button, 'class') === 'sidebar-shape') {
				let elem = new svgObject.ShapesConstruct['CustomShape']({
					sv: svgObject.sv,
					...ShapeInfo[clickedShape],
				});
				elem.create();
				// Add event listener to shape to change property by and on right sidebar
				shapeEventListener(elem.getElement());
			} else {
				elem = new svgObject.ShapesConstruct['Connector']({
					sv: svgObject.sv,
					...ConnectorInfo[clickedShape],
				});
				elem.create();
				connectorEventListener(svgObject.sv);
			}
		});
	});
}

