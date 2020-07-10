export class Handle{
   constructor(props={}){
      const {x, y, width, height} = props;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.r = '5';
      // Control Button Points
      this.points = [[this.x, this.y], // NW
                     [this.x + this.width / 2, this.y], // N
                     [this.x + this.width, this.y], // NE

                     [this.x, this.y + this.height / 2], // W
                     [this.x + this.width, this.y + this.height / 2], // E

                     [this.x, this.y + this.height], // SW
                     [this.x + this.width / 2, this.y + this.height], // S
                     [this.x + this.width, this.y + this.height] // SE
                  ]
   }

   createButtons(){
      this.points.forEach((point, index) => {
         let el = document.createElementNS(SVGNS, 'ellipse');
         el.setAttributeNS(null, 'cx', point[0]);
         el.setAttributeNS(null, 'cy', point[1]);
         el.setAttributeNS(null, 'rx', this.r);
      });
   }
}