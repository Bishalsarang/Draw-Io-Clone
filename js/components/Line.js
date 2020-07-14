import {Shape} from "./Shape.js";

export class Line {
   constructor(props={}){
      const {x1=20, y1=20, x2=60, y2=60, r=2} = props;
      super(props);
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.r = r;


      // this.g = document.createElementNS(SVGNS, 'g');
      this.line = document.createElementNS(SVGNS, 'line');


      this.g.setAttributeNS(null, 'pointer-events', 'all');

      // Draw the line
      this.line.setAttributeNS(null, 'x1', this.x1);
      this.line.setAttributeNS(null, 'y1', this.y1);
      this.line.setAttributeNS(null, 'x2', this.x2);
      this.line.setAttributeNS(null, 'y2', this.y2);
      this.line.setAttributeNS(null, 'stroke', '#000000')
      this.line.setAttributeNS(null, 'stroke-width', '3')

      // Draw  circle 1
      this.circle1 = document.createElementNS(SVGNS, 'ellipse');
      this.circle1.setAttributeNS(null, 'cx', this.x1);
      this.circle1.setAttributeNS(null, 'cy', this.y1);
      this.circle1.setAttributeNS(null, 'rx', this.r);
      this.circle1.setAttributeNS(null, 'ry', this.r);

      // Draw  circle 2
      this.circle2 = document.createElementNS(SVGNS, 'ellipse');
      this.circle2.setAttributeNS(null, 'cx', this.x2);
      this.circle2.setAttributeNS(null, 'cy', this.y2);
      this.circle2.setAttributeNS(null, 'rx', this.r);
      this.circle2.setAttributeNS(null, 'ry', this.r);


      
   }

   create(){
      this.g.appendChild(this.line);
      this.g.appendChild(this.circle1);
      this.g.appendChild(this.circle2);
   }

   getElement() {
		return this.g;
	}
}