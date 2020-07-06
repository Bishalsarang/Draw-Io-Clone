import {Shape} from './Shape.js';

export class Cloud extends Shape{
    constructor(props){
        super(props); 
        this.makePath();
    }

    makePath(){
        this.path = new Path2D('M 550 740 C 526 740 520 760 539.2 764 C 520 772.8 541.6 792 557.2 784 C 568 800 604 800 616 784 C 640 784 640 768 625 760 C 640 744 616 728 595 736 C 580 724 556 724 550 740 Z');
        
    }
 
}

