import {Shape} from './Shape.js';

export class Cloud extends Shape{
    constructor(props){
        super(props); 
        this.makePath();
    }

    makePath(){
        this.context.save();
        this.context.translate(-435+100, -200+100);
        // <path d="" fill="#ffb469" stroke="#000000" stroke-miterlimit="10" pointer-events="all"></path>
        this.path = new Path2D(' M 435.5 557.5 C 425.5 557.5 423 570 431 572.5 C 423 578 432 590 438.5 585 C 443 595 458 595 463 585 C 473 585 473 575 466.75 570 C 473 560 463 550 454.25 555 C 448 547.5 438 547.5 435.5 557.5 Z');
        this.context.restore();
        // this.path = new Path2D('M 550 740 C 526 740 520 760 539.2 764 C 520 772.8 541.6 792 557.2 784 C 568 800 604 800 616 784 C 640 784 640 768 625 760 C 640 744 616 728 595 736 C 580 724 556 724 550 740 Z');
        
    }
 
}

