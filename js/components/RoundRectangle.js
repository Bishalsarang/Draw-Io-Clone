import {Rectangle} from './Rectangle.js';

export class RoundRectangle extends Rectangle{
	constructor(props={}){
        super(props);
        const {rx=3, ry=3} = props;
        // Corners
        this.rx = rx;
        this.ry = ry;

        this.setAttribute(this.path, 'rx', this.rx);
        this.setAttribute(this.path, 'ry', this.ry);
    }
}
