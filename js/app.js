import { Rectangle } from './components/Rectangle.js';
import { Circle } from './components/Circle.js';

class Canvas {
	constructor(selector) {
		this.canvas = document.querySelector(selector);
		this.canvas.width = 300;
		this.canvas.height = 300;
		this.canvas.style.background = '#EBEBEB';

		this.context = this.canvas.getContext('2d');
		this.shapeList = []; // List to store Shapes

        this.shapesClasses = [Rectangle, Circle];
        
        this.eventListener();
	}

	createShape(id) {
		let shape = new this.shapesClasses[id]({ context: this.context, zIndex: this.shapeList.length});
		shape.draw();
		this.shapeList.push(shape);
	}

	getShape(id) {
		return this.shapeList[id];
	}

	eventListener() {
        // Listen for mouse moves
        let that = this;
		this.canvas.addEventListener('click', function (event) {
            that.shapeList.forEach((shape, index) =>{
               
                if(that.context.isPointInPath(shape.getPath(), event.offsetX, event.offsetY)){
                    console.log("Clicked shape: " + index);
                    that.context.fillStyle = 'red';
                }
                else{
                    that.context.fillStyle = 'blue';
                }
                shape.draw();
            })
			// // Check whether point is inside shape
			// if (ctx.isPointInPath(rect, event.offsetX, event.offsetY)) {
			// 	ctx.fillStyle = 'red';
			// } else {
			// 	ctx.fillStyle = 'blue';
			// }

			// // Draw shape
			// ctx.clearRect(0, 0, canvas.width, canvas.height);
			// ctx.fill(rect);
		});
	}
}

let canvas = new Canvas('canvas');

// Get all buttons in DOM that creates different shapes
let allShapesBtn = document.querySelectorAll('.btn-shapes');

// Add event handler for each button
allShapesBtn.forEach((button, index) => {
	button.addEventListener('click', () => {
		let shape = canvas.createShape(index);
		console.log('You have ' + canvas.shapeList.length + ' shapes.');
	});
});
