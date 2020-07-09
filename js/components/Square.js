import {Rectangle} from './Rectangle.js';

export class Square extends Rectangle{
	constructor(props={}){
        super(props);
        
        const {width=58.8} = props;
        this.width = width;
        this.height = width;

        this.setAttribute(this.rect, 'width', this.width);
        this.setAttribute(this.rect, 'height', this.height);
    }
}
