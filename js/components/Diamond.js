import {Shape} from './Shape.js'

export class Diamond extends Shape{
	constructor(props = {}) {
      
      console.log("hhaha");
      super(props);
      const {d='M 15.98 1.36 L 29.58 14.96 L 15.98 28.56 L 2.38 14.96 Z', scale='2 2'} = props;
      this.d = d;
      this.scale = scale;
      this.path = document.createElementNS(SVGNS, 'path');
      this.setShapeSpecificProperties();
   }

   setShapeSpecificProperties() {
		this.path.setAttributeNS(null, 'd', this.d);
   }
}
