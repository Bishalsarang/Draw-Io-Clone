import {Shape} from './Shape.js';

export class Rectangle extends Shape{
    constructor(props){
        super(props);  
        this.path = new Path2D();

        this.makePath();
    }

    makePath(){
        this.path.rect(this.x, this.y, this.width, this.height);
    }
 
}

