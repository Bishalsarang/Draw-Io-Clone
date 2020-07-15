export class TextArea{
   constructor(props={}){
      const {x, y, width, height, offsetX = 8, offsetY = -10, border = 'none', outline = 'none', color = 'black', background = 'transparent', textAlign = 'center'} = props;

      // Layout Poperties
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.offsetX = offsetX;
      this.offsetY = offsetY;

      this.color = color;
      this.background = background;
      this.border = border;
      this.outline = outline;
      
      this.textAlign = textAlign;
     

      // Use ForeignObject tag to use input tag inside svg
      this.foreignObject = document.createElementNS(SVGNS, 'foreignObject');
      this.setForeignObjectAttributes();

      // TODO: Change to div depending on the requirement
      this.inputBox  = document.createElement('div');
      // this.inputBox.innerHTML = "Text";
      this.setTextBoxAttributes();

      this.foreignObject.appendChild(this.inputBox);
   }

   setForeignObjectAttributes(){
      this.foreignObject.setAttributeNS(null, 'x', this.x - 10 + this.offsetX);
      this.foreignObject.setAttributeNS(null, 'y', this.y + this.height / 2 + this.offsetY);
      this.foreignObject.setAttributeNS(null, 'width', this.width);
      this.foreignObject.setAttributeNS(null, 'height', this.height / 2 - this.y - this.offsetY);
      this.foreignObject.setAttributeNS(null, 'class', 'text-box-parent');
   }

   setTextBoxAttributes(){

      // Common Properties
      this.inputBox.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
      // this.inputBox.setAttributeNS(null, 'type', 'text');
      // this.inputBox.setAttributeNS(null, 'name', 'text');
      // Add default font css class
      this.inputBox.setAttributeNS(null, 'class', 'shape-text font-default');


      // this.inputBox.setAttributeNS(null, 'value', this.value);
      // this.inputBox.setAttributeNS(null, 'placeholder', this.placholder);

      // // CSS attributes
      // this.inputBox.style.border = this.border;
      // this.inputBox.style.outline = this.outline;
      // this.inputBox.style.color = this.color;
      // this.inputBox.style.background = this.background;

      this.inputBox.innerHTML = "Text";
      this.inputBox.setAttributeNS(null, 'contenteditable', 'true');
      this.inputBox.style.border = this.border;
      this.inputBox.style.outline = this.outline
      this.inputBox.style.textAlign = this.textAlign;

   }

   getForeignObject(){
      return this.foreignObject;
   }

   getTextObject(){
      return this.inputBox;
   }
}