import { Handle } from './handle.js';
import { TextArea } from './TextArea.js';
import { BoundingBox } from './BoundingBox.js';

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

			/* SVG drawing area properties */
			sv 
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
	
		// SVG Drawing Area
		this.sv  = sv;


		
		// Main group holder which holds du0plicate btn, rotate btn, handle btn plus bounding box and main shape paths
		this.g = document.createElementNS(SVGNS, 'g');
		this.setAttributes();

		// NOTE: SCALING property only applies to path, so our buttons remains the same on resize
		// Group tag which holds boundign box and shape
		this.g_ = document.createElementNS(SVGNS, 'g');


		this.foreignG = document.createElementNS(SVGNS, 'g');

		// Bounding box
		this.boundingBox = new BoundingBox({
			translate: this.translate,
			scale: this.scale,
			rotate: this.rotate,
		}).getBoundingBox();

		// Handle scales thhe actual path but not the whole group holder
		this.handle = new Handle({g_: this.g_}).getHandles();

		// Text
		this.textBox = null; // The dimension of bounding box is not known before adding to DOM

	}

	/**
	 * Apply nonScalingStrokes so that the width remains same while scaling
	 */
	setNonScalingStrokes() {
		this.handle.forEach((button, index) => {
			button.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke');
		});
		this.path.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke');
		this.boundingBox.setAttributeNS(
			null,
			'vector-effect',
			'non-scaling-stroke'
		);
	}

	setAttribute(elem, key, value) {
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

		// This line is commented because we don't want to apply scaling to every elements including buttons
		// We want only our path to scale
		// this.g.setAttributeNS(null, 'scale', this.scale);
		this.g.setAttributeNS(null, 'translate', this.translate);

		this.g.setAttributeNS(
			null,
			'transform',
			`translate(${this.translate})  rotate(${this.rotate})`
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

	setPathAttributes(){
		this.applyScalePath();
		this.path.setAttributeNS(null, 'class', 'svg-shape');
	}

	getElement() {
		return this.g;
	}

	applyScalePath(){
		// APply scaling to path only.
		this.path.setAttributeNS(null, 'scale', `${this.scale}`);
		this.path.setAttributeNS(null, 'transform', `scale(${this.scale})`);
	}

	create() {
		this.setNonScalingStrokes();
		this.setPathAttributes();

		let that = this;
		// FOr  shape holder g
		
		this.g_.appendChild(this.path); // Append the shape path

		// For main holder g
		this.g.appendChild(this.boundingBox); // Append the bounding path

		this.handle.forEach((button, index) => {
			that.g.appendChild(button);
		});

		this.addToDOM();
		
		
		this.g.append(this.g_);
		this.textBox = new TextArea(this.g.getBBox());

		this.foreignG.appendChild(this.textBox.getForeignObject());
		this.g.append(this.foreignG);

		
		
	}

	addToDOM(){
		this.sv.appendChild(this.getElement());
	}
}
