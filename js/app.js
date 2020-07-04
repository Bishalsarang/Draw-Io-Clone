import {Rectangle} from './components/Rectangle.js';

let canvas = document.querySelector('canvas');
canvas.width = 300;
canvas.height = 300;

let ctx = canvas.getContext('2d');


let rect = new Rectangle({context: ctx});
rect.draw();

// let rect = new Path2D();

// rect.scale(2, 2);
// rect.moveTo(0, 0);
// rect.lineTo(100, 0);
// rect.lineTo(100, 100);
// rect.lineTo(0, 100);
// rect.lineTo(0, 0);

// ctx.stroke(rect)


// // Listen for mouse moves
// canvas.addEventListener('mousemove', function(event) {
//     // Check whether point is inside shape
//     if (ctx.isPointInPath(rect, event.offsetX, event.offsetY)) {
//       ctx.fillStyle = "red";
//     }
//     else {
//       ctx.fillStyle = "blue";
//     }
  
//     // Draw shape
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fill(rect);
//   });

