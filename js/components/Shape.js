import { Handle } from './handle.js';
import { TextArea } from './TextArea.js';
import { BoundingBox } from './BoundingBox.js';

export class Shape {
  /**
   * Shape Class
   * @param {object} props
   */
  constructor(props) {
    const {
      /* Stroke Properties */
      stroke = '#000000',
      strokeWidth = '1px',
      strokeDashArray = '',
      strokeDashOffset = '',
      strokeOpacity = '100',
      strokeLineCap = 'butt',
      strokeLineJoin = 'miter', // Value: arcs | bevel |miter | miter-clip | round

      /* Fill Properties */
      fill = '#ffffff',
      fillOpacity = '1',
      fillRule = 'nonzero', // Value: nonzero: eveonodd

      //* Transformation Properties */
      rotate = '0',
      scale = '1 1',
      translate = '400 100',

      /* Cursor Properties */
      cursor = 'move',
      pointer = 'all',

      /* Font Properties */
      fontSize = '14px',
      fontStyle = 'normal',
      fontWeight = 'normal',
      fontVariant = 'normal',
      fontFamily = 'Arial, Helvetica, sans-serif, monospace',

      /* SVG drawing area properties */
      sv
    } = props;

    /* Stroke Properties */
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.strokeLineCap = strokeLineCap;
    this.strokeOpacity = strokeOpacity;
    this.strokeLineJoin = strokeLineJoin;
    this.strokeDashArray = strokeDashArray;
    this.strokeDashOffset = strokeDashOffset;

    /* Fill Properties */
    this.fill = fill;
    this.fillRule = fillRule;
    this.fillOpacity = fillOpacity;

    //* Transformation Properties */
    this.scale = scale;
    this.rotate = rotate;
    this.translate = translate;

    /* Cursor Properties */
    this.cursor = cursor;
    this.pointer = pointer;

    /* Font Properties */
    this.fontSize = fontSize;
    this.fontStyle = fontStyle;
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.fontVariant = fontVariant;

    // SVG Drawing Area
    this.sv = sv;

    // Main group holder which holds du0plicate btn, rotate btn, handle btn plus bounding box and main shape paths
    this.g = document.createElementNS(SVGNS, 'g');
    this.setAttributes();

    // NOTE: SCALING property only applies to path, so our buttons remains the same on resize
    // Group tag which holds boundign box and shape
    this.g_ = document.createElementNS(SVGNS, 'g');
    this.g_.setAttributeNS(null, 'class', 'actual-shape');

    // Foreign element to hold text
    this.foreignG = document.createElementNS(SVGNS, 'g');

    // Bounding box
    this.boundingBox = new BoundingBox({
      scale: this.scale,
      rotate: this.rotate,
      translate: this.translate
    }).getBoundingBox();

    // Handle scales thhe actual path but not the whole group holder
    this.handle = new Handle({ g_: this.g_, sv: this.sv }).getHandles();

    // Text
    this.textBox = null; // The dimension of bounding box is not known before adding to DOM
  }

  /**
   * Apply nonScalingStrokes so that the width remains same while scaling
   */
  setNonScalingStrokes() {
    this.handle.forEach((button) => {
      setSVGAttribute(button, 'vector-effect', 'non-scaling-stroke');
    });

    setSVGAttribute(this.boundingBox, 'vector-effect', 'non-scaling-stroke');
  }

  setAttribute(elem, key, value) {
    setSVGAttribute(elem, key, value);
  }

  setStrokeAttributes() {
    setSVGAttributes(this.g, {
      stroke: this.stroke,
      'stroke-width': this.strokeWidth,
      'stroke-linecap': this.strokeLineCap,
      'stroke-opacity': this.strokeOpacity,
      'stroke-linejoin': this.strokeLineJoin,
      'stroke-dasharray': this.strokeDashArray,
      'stroke-dashoffset': this.strokeDashOffset
    });
  }

  setFillAttributes() {
    setSVGAttributes(this.g, {
      fill: this.fill,
      'fill-rule': this.fillRule,
      'fill-opacity': this.fillOpacity
    });
  }

  setTransformationAttributes() {
    setSVGAttributes(this.g, {
      rotate: this.rotate,
      translate: this.translate,
      transform: `translate(${this.translate})  rotate(${this.rotate})`
    });
  }

  setCursorAttributes() {
    setCSSAttributes(this.g, {
      cursor: 'move',
      pointerEvents: 'all'
    });

    setSVGAttribute(this.g, 'class', 'draggable-group');
  }

  setAttributes() {
    this.setStrokeAttributes();
    this.setFillAttributes();
    this.setCursorAttributes();
    this.setTransformationAttributes();
  }

  setPathAttributes(element) {
    setSVGAttributes(element, {
      class: 'svg-shape',
      scale: `${this.scale}`,
      transform: `scale(${this.scale})`
    });
  }

  getElement() {
    return this.g;
  }

  applyScalePath(that, element) {
    // APply scaling to path only.
    setSVGAttributes(element, {
      scale: `${that.scale}`,
      transform: `scale(${that.scale})`
    });
  }

  create() {
    this.setNonScalingStrokes();

    let that = this;
    // FOr  shape holder g

    // Append all the shape path
    this.shapeElements.forEach((element, index) => {
      that.g_.appendChild(element);

      setSVGAttributes(element, {
        class: 'svg-shape',
        scale: `${that.scale}`,
        transform: `scale(${that.scale})`,
        'vector-effect': 'non-scaling-stroke'
      });
    });

    // this.g_.appendChild(this.path);
    // For main holder g
    this.g.appendChild(this.boundingBox); // Append the bounding path

    this.g.append(this.g_);
    this.handle.forEach((button, index) => {
      that.g.appendChild(button);
    });

    this.addToDOM();

    this.textBox = new TextArea(this.g_.getBBox());

    this.foreignG.appendChild(this.textBox.getForeignObject());
    this.g.append(this.foreignG);
  }

  addToDOM() {
    this.sv.appendChild(this.getElement());
  }
}
