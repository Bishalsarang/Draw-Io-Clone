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
        this.rect = document.createElementNS(SVGNS, 'rect');

        this.setAttributes();
	}

    setAttribute(elem, key, value){
        elem.setAttributeNS(null, key, value);
    }

    setAttributes(){
        this.rect.setAttributeNS(null, 'x', this.x);
		this.rect.setAttributeNS(null, 'y', this.y);
		this.rect.setAttributeNS(null, 'width', this.width);
        this.rect.setAttributeNS(null, 'height', this.height);
	
        
        this.g.setAttributeNS(null, 'fill', this.fill);
        this.g.setAttributeNS(null, 'stroke', this.stroke);
        this.g.style.pointerEvents = 'all';
        this.g.style.cursor = 'move';
    }

	create() {
		this.g.appendChild(this.rect);
    }
    
    getElement(){
        return this.g;
    }
}
