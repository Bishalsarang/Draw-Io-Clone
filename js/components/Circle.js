import {Shape} from './Shape.js';

export class Circle extends Shape{
    constructor(props){
        super(props);  
        this.x = 90;
        this.path = new Path2D();
        this.radius = 10;

        this.makePath();
    }

    makePath(){
        this.path.arc(this.x, this.y, this.radius, 0, 360);
    }
 
}

