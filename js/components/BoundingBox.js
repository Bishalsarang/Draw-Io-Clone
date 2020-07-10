export class BoundingBox{
   /**
    * 
    * @param {String} fill 
    * @param {String} stroke 
    * @param {String} strokeDashArray 
    * @param {STring} strokeWidth 
    */
   constructor(props={}){
      const {fill='none', stroke='blue', strokeDashArray='7', strokeWidth='4', translate, scale, rotate} = props;

      this.fill = fill;
      this.stroke = stroke;
      this.strokeDashArray = strokeDashArray;
      this.strokeWidth = strokeWidth;

      // Get transformation attributes of parent g element
      this.translate = translate;
      this.scale = scale;
      this.rotate = rotate;
      
      this.box = document.createElementNS(SVGNS, 'rect');
      // Bounding box attributes
      this.box.setAttributeNS(null, 'fill', fill);
      this.box.setAttributeNS(null, 'stroke', stroke);
      this.box.setAttributeNS(null, 'stroke-dasharray', strokeDashArray);
      this.box.setAttributeNS(null, 'stroke-width', strokeWidth);

      // this.overRideGlobalTransformationAttributes();
   }

   /**
    * 
    */
   // overRideGlobalTransformationAttributes() {
   //    // Since the box is going to import default transformation property we don't
	// 	this.box.setAttributeNS(null, 'scale', '1 1');
		

	// 	this.box.setAttributeNS(
	// 		null,
	// 		'transform',
	// 		'scale(1 1)'
	// 	);
	// }
   /**
    * Returns bounding box HTML element
    */
   getBoundingBox(){
      return this.box;
   }
}