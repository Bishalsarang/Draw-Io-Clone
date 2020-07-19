export class Connector{
   constructor(props) {
      const {
         stroke = '#000000',
			strokeWidth = '2px',
			strokeDashArray = '',
			strokeDashOffset = '',
			strokeOpacity = '100',
			strokeLineCap = 'butt',
         strokeLineJoin = 'miter',
        
         children,
         sv
      } = props;

      console.log("Here");
      /* Stroke Properties */
		this.stroke = stroke;
		this.strokeWidth = strokeWidth;
		this.strokeLineCap = strokeLineCap;
		this.strokeOpacity = strokeOpacity;
		this.strokeLineJoin = strokeLineJoin;
		this.strokeDashArray = strokeDashArray;
      this.strokeDashOffset = strokeDashOffset;

      this.sv = sv;
      
      this.shapeElements = [];
      this.g = document.createElementNS(SVGNS, 'g');
      children.forEach((child) => {
         const key = Object.keys(child)[0];
         this.createElement(key, child[key]);
     });

     this.setCursorAttributes();
     this.setStrokeAttributes();
 }

 setCursorAttributes() {

   setCSSAttributes(this.g, {
      cursor: "move",
      'pointer-events': "all"
   })

   setSVGAttributes(this.g,{
    'class': 'draggable-group connector-group'}
   );

}
 setStrokeAttributes() {

   setSVGAttributes(this.g, {
      stroke: this.stroke,
      'stroke-width': this.strokeWidth,
      'stroke-linecap': this.strokeLineCap,
      'stroke-opacity': this.strokeOpacity,
      'stroke-linejoin': this.strokeLineJoin,
      'stroke-dasharray': this.strokeDashArray,
      'stroke-dashoffset': this.strokeDashOffset,
   });
}
 createElement(key, props={}){
   let path = document.createElementNS(SVGNS, key);
   this.setProperties(path, props);
}

setProperties(path, props){
   for(const [key, value] of Object.entries(props)){
      setSVGAttribute(path, key, value);
   }
   this.shapeElements.push(path);
}

create() {
   let that = this;
   this.shapeElements.forEach((element, index) => {
      that.g.appendChild(element);
   });
   this.addToDOM();
}

 getElement() {
   return this.g;
}

 addToDOM() {
   this.sv.append(this.getElement());
}

}