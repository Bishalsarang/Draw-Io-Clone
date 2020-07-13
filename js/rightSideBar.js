function addEventListenerRightSideBar() {
	let pickedColor = document.getElementById('color-picker');
	pickedColor.addEventListener('change', (e) => {
		if (selectedShape) {
			selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
		}
	});

	let filledCheck = document.getElementById('fill-status');
	filledCheck.addEventListener('change', (e) => {
		// If selected shape xa vaney change the property
		if (selectedShape) {
			if (filledCheck.checked) {
				selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
			} else {
				selectedShape.setAttributeNS(null, 'fill', 'none');
			}
		}
	});

	let lineColor = document.getElementById('stroke-color-picker');
	lineColor.addEventListener('change', (e) => {
		if (selectedShape) {
			selectedShape.setAttributeNS(null, 'stroke', lineColor.value);
		}
	});

	let lineStatus = document.getElementById('line-status');
	lineStatus.addEventListener('change', (e) => {
		if (selectedShape) {
			if (lineStatus.checked) {
				selectedShape.setAttributeNS(null, 'stroke', lineColor.value);
			} else {
				selectedShape.setAttributeNS(null, 'stroke', 'none');
			}
		}
	});

	let lineType = document.getElementById('line-type');
	let lineWidth = document.getElementById('line-width');

	lineWidth.addEventListener('change', (e) => {
		if (selectedShape) {
			selectedShape.setAttributeNS(null, 'stroke-width', lineWidth.value);
		}
	});

	let opacity = document.getElementById('opacity');
	opacity.addEventListener('change', (e) => {
		if (selectedShape) {
			selectedShape.setAttributeNS(
				null,
				'fill-opacity',
				parseInt(opacity.value) / 100
			);
		}
	});

	let rotation = document.getElementById('rotate');
	rotation.addEventListener('change', (e) => {
		if (selectedShape) {
			let translate = selectedShape.getAttributeNS(null, 'translate');
			let rotate = rotation.value;

			let newTransformation = `translate(${translate}) rotate(${rotate})`;

			selectedShape.setAttributeNS(null, 'translate', translate);
			selectedShape.setAttributeNS(null, 'rotate', rotate);

			selectedShape.setAttributeNS(null, 'transform', newTransformation);
		}
	});

	// Width Changed
	let w = document.getElementById('width');
	w.addEventListener('change', (e) => {
		if (selectedShape) {
			// Scaling applies to actual paths only
			let widthValue = w.value;
			selectedShape.querySelectorAll('.svg-shape').forEach((path, index) => {
				let [_, heightValue] = path
					.getAttributeNS(null, 'scale')
					.split(' ');
				
				let { x, y } = path.getBBox();
				path.setAttributeNS(null, 'scale', `${widthValue} ${heightValue}`);
				path.setAttributeNS(
					null,
					'transform',
					`scale(${widthValue} ${heightValue}) translate(${-x} ${-y})`
				);
			});
			resetControls();
		}
	});

	// Height Changed
	let h = document.getElementById('height');
	h.addEventListener('change', (e) => {
		if (selectedShape) {
			// Scaling applies to actual paths only
			let heightValue = h.value;
			selectedShape.querySelectorAll('.svg-shape').forEach((path, index) => {
				let [widthValue, _] = path.getAttributeNS(null, 'scale').split(' ');
				let { x, y } = path.getBBox();
				path.setAttributeNS(null, 'scale', `${widthValue} ${heightValue}`);
				path.setAttributeNS(
					null,
					'transform',
					`scale(${widthValue} ${heightValue}) translate(${-x} ${-y})`
				);
			});
			resetControls();
		}
	});

	// Left Changed
	let left = document.getElementById('left');
	left.addEventListener('change', (e) => {
		
		if (selectedShape) {
			let [x, y] = selectedShape
				.getAttributeNS(null, 'translate')
				.split(' ');
			
			let translate = `${left.value} ${y}`;
			let rotate = rotation.value;

			let newTransformation = `translate(${translate}) rotate(${rotate})`;

			selectedShape.setAttributeNS(null, 'translate', translate);
			selectedShape.setAttributeNS(null, 'rotate', rotate);

			selectedShape.setAttributeNS(null, 'transform', newTransformation);
		}
	});

	// Top Changed
	let top = document.getElementById('top');
	top.addEventListener('change', (e) => {
		if (selectedShape) {
			let [x, y] = selectedShape
				.getAttributeNS(null, 'translate')
				.split(' ');
			let translate = `${x} ${top.value}`;
			let rotate = rotation.value;

			let newTransformation = `translate(${translate}) rotate(${rotate})`;

			selectedShape.setAttributeNS(null, 'translate', translate);
			selectedShape.setAttributeNS(null, 'rotate', rotate);

			selectedShape.setAttributeNS(null, 'transform', newTransformation);
		}
	});


	// Font Changed
	let font = document.getElementById('fonts');
	font.addEventListener('change', (e) =>{
		if(selectedShape){
			let textArea = selectedShape.querySelector('.shape-text');
			// Remove previously selected class
			let fontClass = textArea.classList[1];
			textArea.classList.remove(fontClass);
			// Add selected class
			let selectedClass = font.options[font.selectedIndex].getAttributeNS(null, 'class');
			textArea.classList.add(selectedClass);
		}
	});

	let boldButton = document.getElementById('bold-btn');
	boldButton.addEventListener('click', (e) => {
		if(selectedShape){
			let textArea = selectedShape.querySelector('.shape-text');
			textArea.classList.toggle('text-bold');

		}
	});

	let italicsButton = document.getElementById('italics-btn');
	italicsButton.addEventListener('click', (e) => {
		if(selectedShape){
			let textArea = selectedShape.querySelector('.shape-text');
			textArea.classList.toggle('text-italics');

		}
	});

	let undelineButton = document.getElementById('underline-btn');
	undelineButton.addEventListener('click', (e) => {
		if(selectedShape){
			
			let textArea = selectedShape.querySelector('.shape-text');
			textArea.classList.toggle('text-underline');

		}
	});
}
