export class TextArea {
  constructor(props = {}) {
    const {
      x,
      y,
      width,
      height,
      offsetX = 8,
      offsetY = -10,
      border = 'none',
      color = 'black',
      outline = 'none',
      fontSize = '12px',
      overflow = 'visible',
      textAlign = 'center',
      background = 'transparent'
    } = props;

    // Layout Poperties
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.color = color;
    this.border = border;
    this.outline = outline;
    this.background = background;

    this.overflow = overflow;
    this.fontSize = fontSize;
    this.textAlign = textAlign;

    // Use ForeignObject tag to use input tag inside svg
    this.foreignObject = document.createElementNS(SVGNS, 'foreignObject');
    this.setForeignObjectAttributes();

    // TODO: Change to div depending on the requirement
    this.inputBox = document.createElement('div');
    // this.inputBox.innerHTML = "Text";
    this.setTextBoxAttributes();

    this.foreignObject.appendChild(this.inputBox);
  }

  setForeignObjectAttributes() {
    setSVGAttributes(this.foreignObject, {
      width: this.width,
      overflow: this.overflow,
      class: 'text-box-parent',
      x: this.x - 10 + this.offsetX,
      y: this.y + this.height / 2 + this.offsetY,
      height: this.height / 2 - this.y - this.offsetY
    });
  }

  setTextBoxAttributes() {
    // Common Properties
    this.inputBox.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    this.inputBox.innerHTML = 'Text';

    // Add default font css class and contenteditable
    setSVGAttributes(this.inputBox, {
      contenteditable: 'true',
      class: 'shape-text font-default'
    });

    // Apply CSS Attributes
    setCSSAttributes(this.inputBox, {
      color: this.color,
      border: this.border,
      outline: this.outline,
      'font-size': this.fontSize,
      background: this.background,
      'text-align': this.textAlign
    });
  }

  getForeignObject() {
    return this.foreignObject;
  }

  getTextObject() {
    return this.inputBox;
  }
}
