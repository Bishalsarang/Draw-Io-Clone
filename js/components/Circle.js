import {Ellipse} from './Ellipse.js'

export class Circle extends Ellipse{
     constructor(props={}){
        super(props);

        const {rx = 30} = props;
        // Set  x-radius and y-radius equal
        this.rx = rx;
        this.ry = rx;
        
        this.path.setAttributeNS(null, 'rx', this.rx);
		    this.path.setAttributeNS(null, 'ry', this.ry);
    } 
}