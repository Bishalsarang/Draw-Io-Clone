export class Handle {
	constructor(props = {}) {
		const { x, y, width, height } = props;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.r = '5';

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
		// let el = document.createElementNS(SVGNS, 'path');
		// el.setAttributeNS(null, 'fill', this.color);

      // el.setAttributeNS(null, 'stroke', this.color);
      // el.setAttributeNS(null, 'class', 'rotate-button');
      // el.setAttributeNS(null, 'style', 'visibility: hidden;')
		// el.setAttributeNS(
		// 	null,
		// 	'd',
		// 	'M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z'
      // );
      // this.buttonList.push(el);

		for (let i = 0; i < 8; i++) {
			let el = document.createElementNS(SVGNS, 'ellipse');
			el.setAttributeNS(null, 'fill', this.color);
			el.setAttributeNS(null, 'stroke', this.color);
			el.setAttributeNS(null, 'stroke-width', '1');
			el.setAttributeNS(null, 'class', 'resize-button');
			el.setAttributeNS(null, 'cursor', this.resizeCursor[i]);
			// Add Handles button
			this.buttonList.push(el);
		}
	}

	getHandles() {
		return this.buttonList;
	}
}
