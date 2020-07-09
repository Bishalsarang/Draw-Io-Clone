export class Rectangle {
	constructor(props={}) {
		const {
			x = 10,
			y = 10,
			width = 58.8,
			height = 68.4,
			stroke = '#000000',
			fill = '#ffffff',
        } = props;
        
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.stroke = stroke;
        this.fill = fill;
        
        this.g = document.createElementNS(SVGNS, 'g');
        this.boundingBox = document.createElementNS(SVGNS, 'rect');
        this.rect = document.createElementNS(SVGNS, 'rect');

        this.setAttributes();
	}

    setAttribute(elem, key, value){
        elem.setAttributeNS(null, key, value);
    }

    setAttributes(){
        // Rectangle Attributes
        this.rect.setAttributeNS(null, 'x', this.x);
		this.rect.setAttributeNS(null, 'y', this.y);
		this.rect.setAttributeNS(null, 'width', this.width);
        this.rect.setAttributeNS(null, 'height', this.height);
	
        // Group attributes
        this.g.setAttributeNS(null, 'fill', this.fill);
        this.g.setAttributeNS(null, 'stroke', this.stroke);
        // Custom attributes to ease transformations
        this.g.setAttributeNS(null, 'dragX', this.x);
        this.g.setAttributeNS(null, 'dragY', this.y);
        this.g.setAttributeNS(null, 'rotate', '0');
        this.g.setAttributeNS(null, 'scale', '1 1');
        this.g.setAttributeNS(null, 'rotate', '0');
        this.g.setAttributeNS(null, 'translate', '0 0');

        this.g.setAttributeNS(null, 'class', 'draggable-group');
        this.g.style.pointerEvents = 'all';
        this.g.style.cursor = 'move';
        this.g.setAttributeNS(null, 'transform', 'scale(1, 1) rotate(0)')

        // Bounding box attributes
        this.boundingBox.setAttributeNS(null, 'fill', 'none');
        this.boundingBox.setAttributeNS(null, 'stroke', 'blue');
        this.boundingBox.setAttributeNS(null, 'stroke-dasharray', '4');
        this.boundingBox.setAttributeNS(null, 'stroke-width', '4');
    }

	create() {
        this.g.appendChild(this.boundingBox);
		this.g.appendChild(this.rect);
    }
    
    getElement(){
        return this.g;
    }
}
