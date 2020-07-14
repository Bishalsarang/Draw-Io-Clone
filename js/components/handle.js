export class Handle {
	constructor(props = {}) {
		const { g_ , sv} = props;
		this.r = '5';
		this.g_ = g_;
		this.sv = sv;

		this.buttonList = [];
		// Cursor for resize
		this.resizeCursor = [
			'nw-resize',
			'n-resize',
			'ne-resize',
			'w-resize',
			'e-resize',
			'sw-resize',
			's-resize',
			'se-resize',
		];

		this.color = '#29b6f2';
		this.createButtons();
	}

	createButtons() {
		// Rotate Button
		let el = document.createElementNS(SVGNS, 'path');
		el.setAttributeNS(null, 'fill', this.color);

		el.setAttributeNS(null, 'stroke', this.color);
		el.setAttributeNS(null, 'class', 'rotate-button');
		el.setAttributeNS(null, 'style', 'visibility: hidden;')
		el.setAttributeNS(
			null,
			'd',
			'M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z'
		);

		this.buttonList.push(el);
		
		// Resize handles plus connector button
		for (let i = 0; i < 8; i++) {
			let el = document.createElementNS(SVGNS, 'ellipse');
			el.setAttributeNS(null, 'fill', this.color);
			el.setAttributeNS(null, 'stroke', this.color);
			el.setAttributeNS(null, 'stroke-width', '1');
			el.setAttributeNS(null, 'class', 'resize-button');
			el.setAttributeNS(null, 'cursor', this.resizeCursor[i]);

			let id = this.resizeCursor[i].split('-')[0];
			el.setAttributeNS(null, 'id', id);
			
			el.addEventListener('click', (e) => {
				this.handleDrag(el, id);
				
			});
			// Add Handles button
			this.buttonList.push(el);


			let connector = document.createElementNS(SVGNS, 'g');
			connector.setAttributeNS(null, 'class', 'connector-dot');
			connector.setAttributeNS(null, 'x', -100);
			connector.setAttributeNS(null, 'y', 0);
			let largeCircle = document.createElementNS(SVGNS, 'circle');
			
			largeCircle.setAttributeNS(null, 'cx', '9');
			largeCircle.setAttributeNS(null, 'cy', '9');
			largeCircle.setAttributeNS(null, 'r', '5');
			largeCircle.setAttributeNS(null, 'stroke', '#fff');
			largeCircle.setAttributeNS(null, 'fill', '#29b6f2');
			largeCircle.setAttributeNS(null, 'stroke-width', '1');

			let smallCircle = document.createElementNS(SVGNS, 'circle');
			smallCircle.setAttributeNS(null, 'cx', '9');
			smallCircle.setAttributeNS(null, 'cy', '9');
			smallCircle.setAttributeNS(null, 'r', '2');
			smallCircle.setAttributeNS(null, 'stroke', '#fff');
			smallCircle.setAttributeNS(null, 'fill', 'transparent');

			connector.appendChild(largeCircle);
			connector.appendChild(smallCircle)
			this.buttonList.push(connector);
	

			
		}
	}

	/**
	 * 
	 * @param {} el Resize button element
	 * Returns parent element of button
	 */
	getParentShape(el){
		return el.parentNode;
	}

	handleDrag(el, id) {

		let that = this;
		let offset, transform, selectedElement, previous = {};
		el.addEventListener('mousedown', startResize);
		el.addEventListener('mousemove', resize);
		el.addEventListener('mouseup', stopResize);
		el.addEventListener('mouseleave', stopResize);

		function getMousePosition(evt) {
			let CTM = that.sv.getScreenCTM();
			return {
				x: (evt.clientX - CTM.e) / CTM.a,
				y: (evt.clientY - CTM.f) / CTM.d,
			};
		}

		function initialiseDragging(evt) {
			offset = getMousePosition(evt);
			
			// Make sure the first transform on the element is a translate transform
			var transforms = selectedElement.transform.baseVal;
	
			if (
				transforms.length === 0 ||
				transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
			) {
				// Create an transform that translates by (0, 0)
				var translate = that.sv.createSVGTransform();
				translate.setTranslate(0, 0);
				selectedElement.transform.baseVal.insertItemBefore(translate, 0);
			}
	
			// Get initial translation
			transform = transforms.getItem(0);
			offset.x -= transform.matrix.e;
			offset.y -= transform.matrix.f;

		}

		function startResize(evt){
			console.log("Mouse click" , getMousePosition(evt));
			selectedElement = that.getParentShape(el);
			let coord = getMousePosition(evt);
			previous.x = coord.x;
			previous.y = coord.y;
			initialiseDragging(evt);
			// 

		}

		function resize(evt){
			// console.log("Mouse move", getMousePosition(evt));
			if (selectedElement) {
				evt.preventDefault();
				let coord = getMousePosition(evt);
				
				transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
				// Apply translation on dragging
				selectedElement.setAttributeNS(
					null,
					'translate',
					coord.x - offset.x + ' ' + (coord.y - offset.y)
				);
				let actualShape = selectedElement.querySelector('.actual-shape');
				let {x, y, width, height} = actualShape.getBBox();
				let deltaX = previous.x - coord.x;
				let deltaY = previous.y - coord.y;

				previous.x = coord.x;
				previous.y = (coord.y);
			// 	// 
			// 	console.log(actualShape.getBBox());
				console.log(deltaX, deltaY);
				for(let element of actualShape.children){
					let [scaleX, scaleY ] = element.getAttributeNS(null, 'scale').split(' ');
					
					let newScaleX = (width - deltaX) / (width / scaleX);
					let newScaleY = (height - deltaY) / (height / scaleY);


					
			// 		// transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
			// 		//  selectedElement.setAttributeNS(
			// 		// 	null,
			// 		// 	'translate',
			// 		// 	coord.x - offset.x + ' ' + (coord.y - offset.y)
			// 		// );
					element.setAttributeNS(null, 'scale', `${newScaleX} ${newScaleY}`);
					element.setAttributeNS(null, 'transform', `scale(${newScaleX} ${newScaleY})`);
					
		

			}

		}
	}

		function stopResize(evt){
			console.log("Mouse up", getMousePosition(evt));
			if (selectedElement) {
				let newTransformation = selectedElement.getAttributeNS(
					null,
					'transform',

				);
				// element.removeAttributeNS(null, 'transform');
				// element.setAttributeNS(null, 'transform', `scale(${newScaleX} ${newScaleY}) translate(${-x} ${-y})`);
					
		

	
				// selectedElement.removeAttributeNS(null, 'transform');
				// selectedElement.setAttribute('transform', newTransformation);
			}
			selectedElement = false;
		}

		
	
	}

	getHandles() {
		return this.buttonList;
	}
}
