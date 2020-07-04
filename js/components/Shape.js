export class Shape{
    constructor(props){
        let {width=120, height=60, x=100, y=100, angle=0, context} = props;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.angle = 0;

        this.stroke = false;
        this.fill = true;
        this.context.fillStyle = 'red';


        this.context = context;
    }
    
    draw(){
        if(this.stroke){
            this.context.stroke(this.path);
        }
        else{
            this.context.fill(this.path);
        }
        
    }
}
