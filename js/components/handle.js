export class Handle{
   constructor(props={}){
      const {x, y, width, height} = props;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.r = '5';

      this.buttonList = [];
      // Control Button Points
      // this.points = [[this.x, this.y], // NW
      //                [this.x + this.width / 2, this.y], // N
      //                [this.x + this.width, this.y], // NE

      //                [this.x, this.y + this.height / 2], // W
      //                [this.x + this.width, this.y + this.height / 2], // E

      //                [this.x, this.y + this.height], // SW
      //                [this.x + this.width / 2, this.y + this.height], // S
      //                [this.x + this.width, this.y + this.height] // SE
      //             ]

      this.createButtons();
   }

   createButtons(){
     for(let i = 0; i < 8; i++){
      let el = document.createElementNS(SVGNS, 'ellipse');
      // el.setAttributeNS(null, 'rx', this.r);
      // el.setAttributeNS(null, 'ry', this.r);
      el.setAttributeNS(null, 'fill', '#29b6f2');
      el.setAttributeNS(null, 'stroke', '#fff');
      el.setAttributeNS(null, 'stroke-width', '1');
      el.setAttributeNS(null, 'class', 'handle-button');
      // Add Handles button
      this.buttonList.push(el);
     }
      // this.points.forEach((point, index) => {
      //    let el = document.createElementNS(SVGNS, 'ellipse');
      //    el.setAttributeNS(null, 'fill', '#29b6f2');
      //    el.setAttributeNS(null, 'stroke', '#fff');
      //    el.setAttributeNS(null, 'stroke-width', '1');

      //    // Add Handles button
      //    this.buttonList.push(el);
      // });
   }

   getHandles(){
      return this.buttonList;
   }
}