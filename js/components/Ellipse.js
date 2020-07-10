import {Shape} from './Shape.js'

export class Ellipse extends Shape {
	constructor(props = {}) {
		super(props);
		const { cx = 50, cy = 50, rx = 30, ry = 20} = props;

		this.cx = cx;
		this.cy = cy;
		this.rx = rx;
		this.ry = ry;

      this.path = document.createElementNS(SVGNS, 'ellipse');
		this.setShapeSpecificProperties();
	}

	setShapeSpecificProperties() {
		this.path.setAttributeNS(null, 'cx', this.cx);
		this.path.setAttributeNS(null, 'cy', this.cy);
		this.path.setAttributeNS(null, 'rx', this.rx);
		this.path.setAttributeNS(null, 'ry', this.ry);
	}
}
