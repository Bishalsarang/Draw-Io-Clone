export class TextArea{
   constructor(props={}){
      const {x, y, width, height, border = 'none', outline = 'none', color = 'white', background = 'transparent', placeholder='', value = 'Text'} = props;

      // Layout Poperties
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.color = color;
      this.border = border;
      this.outline = outline;
      
      this.value = value;
      this.placholder = placeholder;

      // Use ForeignObject tag to use input tag inside svg
      this.foreignObject = document.createElementNS(SVGNS, 'foreignObject');
      this.setForeignObjectAttributes();

      // TODO: Change to div depending on the requirement
      this.inputBox  = document.createElementNS(SVGNS, 'div');
      this.inputBox.innerHTML = "hshshs";
      this.setTextBoxAttributes();

      this.foreignObject.appendChild(this.inputBox);
   }

   setForeignObjectAttributes(){
      this.foreignObject.setAttributeNS(null, 'x', this.x);
      this.foreignObject.setAttributeNS(null, 'y', this.y);
      this.foreignObject.setAttributeNS(null, 'width', this.width);
      this.foreignObject.setAttributeNS(null, 'height', this.height);
   }

   setTextBoxAttributes(){

      // Common Properties
      this.inputBox.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
      // this.inputBox.setAttributeNS(null, 'type', 'text');
      // this.inputBox.setAttributeNS(null, 'name', 'text');
      // this.inputBox.setAttributeNS(null, 'class', 'shape-text');


      // this.inputBox.setAttributeNS(null, 'value', this.value);
      // this.inputBox.setAttributeNS(null, 'placeholder', this.placholder);

      // // CSS attributes
      // this.inputBox.style.border = this.border;
      // this.inputBox.style.outline = this.outline;
      // this.inputBox.style.color = this.color;
      // this.inputBox.style.background = this.background;
   }

   getForeignObject(){
      return this.foreignObject;
   }

   getTextObject(){
      return this.inputBox;
   }
}