export class BoundingBox{
   /**
    * 
    * @param {String} fill 
    * @param {String} stroke 
    * @param {String} strokeDashArray 
    * @param {STring} strokeWidth 
    */
   constructor(fill='none', stroke='blue', strokeDashArray='4', strokeWidth='4'){
      this.box = document.createElementNS(SVGNS, 'rect');
      // Bounding box attributes
      this.box.setAttributeNS(null, 'fill', fill);
      this.box.setAttributeNS(null, 'stroke', stroke);
      this.box.setAttributeNS(null, 'stroke-dasharray', strokeDashArray);
      this.box.setAttributeNS(null, 'stroke-width', strokeWidth);
   }

   /**
    * Returns bounding box HTML element
    */
   getBoundingBox(){
      return this.box;
   }
}