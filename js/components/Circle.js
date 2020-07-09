import {Ellipse} from './Ellipse.js'

export class Circle extends Ellipse{
     constructor(props={}){
        super(props);

        const {rx = 20} = props;
        // Set  x-radius and y-radius equal
        this.rx = rx;
        this.ry = rx;
        
        this.ellipse.setAttributeNS(null, 'rx', this.rx);
		this.ellipse.setAttributeNS(null, 'ry', this.ry);
    } 
}