import {BoundingBox} from './BoundingBox.js'
import { Handle } from './handle.js';

export class Shape {
	/**
	 * Shape Class
	 * @param {object} props
	 */
	constructor(props) {
		const {
			/* Stroke Properties */
			stroke = '#000000',
			strokeWidth = '1px',
			strokeDashArray = '',
			strokeDashOffset = '',
			strokeOpacity = '100',
			strokeLineCap = 'butt',
			strokeLineJoin = 'miter', // Value: arcs | bevel |miter | miter-clip | round

			/* Fill Properties */
			fill = '#ffffff',
			fillOpacity = '100',
			fillRule = 'nonzero', // Value: nonzero: eveonodd

			//* Transformation Properties */
			rotate = '0',
			scale = '1 1',
			translate = '0 0',

			/* Cursor Properties */
			cursor = 'move',
			pointer = 'all',

			/* Font Properties */
			fontSize = '14px',
			fontStyle = 'normal',
			fontWeight = 'normal',
			fontVariant = 'normal',
			fontFamily = 'Arial, Helvetica, sans-serif, monospace',
		} = props;

		/* Stroke Properties */
		this.stroke = stroke;
		this.strokeWidth = strokeWidth;
		this.strokeLineCap = strokeLineCap;
		this.strokeOpacity = strokeOpacity;
		this.strokeLineJoin = strokeLineJoin;
		this.strokeDashArray = strokeDashArray;
		this.strokeDashOffset = strokeDashOffset;

		/* Fill Properties */
		this.fill = fill;
		this.fillRule = fillRule;
		this.fillOpacity = fillOpacity;

		//* Transformation Properties */
		this.scale = scale;
		this.rotate = rotate;
		this.translate = translate;

		/* Cursor Properties */
		this.cursor = cursor;
		this.pointer = pointer;

		/* Font Properties */
		this.fontSize = fontSize;
		this.fontStyle = fontStyle;
		this.fontFamily = fontFamily;
		this.fontWeight = fontWeight;
		this.fontVariant = fontVariant;

		// Bounding box
		this.boundingBox = new BoundingBox({translate: this.translate, scale: this.scale, rotate: this.rotate}).getBoundingBox();
		this.handle = new Handle().getHandles();

		
		// Set Shape Attributes
		this.g = document.createElementNS(SVGNS, 'g');
		this.setAttributes();
	}

	setAttribute(elem, key, value){
		elem.setAttributeNS(null, key, value);
  }


	setStrokeAttributes() {
		this.g.setAttributeNS(null, 'stroke', this.stroke);
		this.g.setAttributeNS(null, 'stroke-width', this.strokeWidth);
		this.g.setAttributeNS(null, 'stroke-linecap', this.strokeLineCap);
		this.g.setAttributeNS(null, 'stroke-opacity', this.strokeOpacity);
		this.g.setAttributeNS(null, 'stroke-linejoin', this.strokeLineJoin);
		this.g.setAttributeNS(null, 'stroke-dasharray', this.strokeDashArray);
		this.g.setAttributeNS(null, 'stroke-dashoffset', this.strokeDashOffset);
	}

	setFillAttributes() {
		this.g.setAttributeNS(null, 'fill', this.fill);
		this.g.setAttributeNS(null, 'fill-rule', this.fillRule);
		this.g.setAttributeNS(null, 'fill-opacity', this.fillOpacity);
	}

	setTransformationAttributes() {
		this.g.setAttributeNS(null, 'rotate', this.rotate);
		this.g.setAttributeNS(null, 'scale', this.scale);
		this.g.setAttributeNS(null, 'translate', this.translate);

		this.g.setAttributeNS(
			null,
			'transform',
			`translate(${this.translate}) scale(${this.scale}) rotate(${this.rotate})`,
		);
	}

	setCursorAttributes() {
		this.g.style.cursor = 'move';
		this.g.style.pointerEvents = 'all';
		this.g.setAttributeNS(null, 'class', 'draggable-group');
	}

	setAttributes() {
		this.setStrokeAttributes();
		this.setFillAttributes();
		this.setCursorAttributes();
		this.setTransformationAttributes();
	}

	getElement() {
		return this.g;
	}

	create() {
		let that = this;
		this.g.appendChild(this.boundingBox); // Append the bounding path
		
		this.g.appendChild(this.path); // Append the shape path
		this.handle.forEach((button, index) => {
			that.g.appendChild(button);
		})
	}
}
