import {Rectangle} from './Rectangle.js';

export class RoundRectangle extends Rectangle{
	constructor(props={}){
        super(props);
        const {rx=3, ry=3} = props;
        // Corners
        this.rx = rx;
        this.ry = ry;

        this.setAttribute(this.rect, 'rx', this.rx);
        this.setAttribute(this.rect, 'ry', this.ry);
    }
}
