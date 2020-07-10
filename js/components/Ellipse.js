import {Shape} from './Shape.js'

export class Ellipse extends Shape {
	constructor(props = {}) {
		super(props);
		const { cx = 50, cy = 50, rx = 20, ry = 10} = props;

		this.cx = cx;
		this.cy = cy;
		this.rx = rx;
		this.ry = ry;

      this.ellipse = document.createElementNS(SVGNS, 'ellipse');
		this.setShapeSpecificProperties();
	}

	setShapeSpecificProperties() {
		this.ellipse.setAttributeNS(null, 'cx', this.cx);
		this.ellipse.setAttributeNS(null, 'cy', this.cy);
		this.ellipse.setAttributeNS(null, 'rx', this.rx);
		this.ellipse.setAttributeNS(null, 'ry', this.ry);
	}

	create() {
		this.g.appendChild(this.boundingBox);
		this.g.appendChild(this.ellipse);
	}
}
