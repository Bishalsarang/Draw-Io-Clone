
import {Shape} from './Shape.js';

export class Rectangle extends Shape{
	constructor(props={}) {
        super(props); // Initialize all the shape properties

		const {
			x = 10,
			y = 10,
			width = 58.8,
			height = 68.4,
        } = props;
        
        // Rectangle Specific Properties
		this.x = x;
		this.y = y;
		this.width = width;
        this.height = height;
        
        // Custom attributes to ease transformations
		this.g.setAttributeNS(null, 'dragX', this.x);
        this.g.setAttributeNS(null, 'dragY', this.y);
        
       
        this.rect = document.createElementNS(SVGNS, 'rect');

        this.setShapeSpecificProperties();
	}
   
    setShapeSpecificProperties(){
        // Rectangle Attributes
        this.rect.setAttributeNS(null, 'x', this.x);
		this.rect.setAttributeNS(null, 'y', this.y);
		this.rect.setAttributeNS(null, 'width', this.width);
        this.rect.setAttributeNS(null, 'height', this.height);
    }

	create() {
        this.g.appendChild(this.boundingBox);
		this.g.appendChild(this.rect);
    }
}
