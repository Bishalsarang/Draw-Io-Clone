import { Rectangle } from './components/Rectangle.js';
import { Circle } from './components/Circle.js';
import { Cloud } from './components/Cloud.js';

class Canvas {
	constructor(selector) {
		this.canvas = document.querySelector(selector);
		this.canvas.width = 900;
		this.canvas.height = 1800;
		this.canvas.style.background = '#EBEBEB';

		this.context = this.canvas.getContext('2d');
		this.shapeList = []; // List to store Shapes

        this.shapesClasses = [Rectangle, Circle, Cloud];
        
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

	// clear the canvas
	clear() {
    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawAll(){
		this.clear();
		this.shapeList.forEach((shape, index) =>{
			shape.draw();
		});
	}

	eventListener() {
        // Listen for mouse moves
        let that = this;
		this.canvas.addEventListener('click', function (event) {
            // that.clear();
            that.shapeList.forEach((shape, index) =>{

                let rect = that.canvas.getBoundingClientRect(); 
                if(that.context.isPointInPath(shape.getPath(), event.clientX - rect.left - shape.tx, event.clientY - rect.top - shape.ty)){
					console.log("Clicked shape: " + index);
					

					shape.tx += 10;
					shape.ty += 100;
					that.drawAll();
					console.log(that.context);
                    that.context.fillStyle = 'red';
                }
                else{
                    that.context.fillStyle = 'blue';
				}
				// that.context.restore();
				
                // shape.draw();
            })
		});

		// Exporting Image as PNG
		var button = document.querySelector('.btn-save');
		button.addEventListener('click', function (e) {
			var dataURL = that.canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
    		button.setAttribute('href', dataURL);
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





