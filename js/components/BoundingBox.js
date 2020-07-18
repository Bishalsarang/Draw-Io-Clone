export class BoundingBox{
   /**
    * 
    * @param {String} fill 
    * @param {String} stroke 
    * @param {String} strokeDashArray 
    * @param {STring} strokeWidth 
    */
   constructor(props={}){
      const {fill='none', stroke='blue', strokeDashArray='4', strokeWidth='2', translate, scale, rotate} = props;

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
      setSVGAttributes(this.box, {
         'fill': fill,
         'stroke': stroke,
         'class': 'bounding-box',
         'stroke-width': strokeWidth,
         'stroke-dasharray':  strokeDashArray,
      });
   }

   
   /**
    * Returns bounding box HTML element
    */
   getBoundingBox(){
      return this.box;
   }
}