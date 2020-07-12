import {Shape} from './Shape.js'

export class CustomShape extends Shape{
	constructor(props = {}) {
      super(props);
      const {d, scale} = props;
      this.d = d;
      this.scale = scale;
      this.path = document.createElementNS(SVGNS, 'path');
      this.setShapeSpecificProperties();
   }

   setShapeSpecificProperties() {
		this.path.setAttributeNS(null, 'd', this.d);
   }
}
