import { Rectangle } from './components/Rectangle.js';
import { Circle } from './components/Circle.js';
import { Cloud } from './components/Cloud.js';

class Canvas {
	constructor(selector) {
		this.canvas = document.querySelector(selector);
		this.canvas.width = 500;
		this.canvas.height = 500;
		this.canvas.style.background = '#EBEBEB';

		this.context = this.canvas.getContext('2d');
		this.shapeList = []; // List to store Shapes

        this.shapesClasses = [Rectangle, Circle, Cloud];
        
        this.eventListener();
	}

	createShape(id) {
		let shape = new this.shapesClasses[id]({ x: 100, y: 100, width: 20, height: 20, context: this.context, zIndex: this.shapeList.length});
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

	drawGrid(gridPixelSize, color)
{
this.context.save();
this.context.lineWidth = 1;
this.context.strokeStyle = color;

// horizontal grid lines
for(var i = 0; i <= this.canvas.height; i = i + gridPixelSize)
{
	this.context.beginPath();
	this.context.moveTo(0, i);
	this.context.lineTo(this.canvas.width, i);
	this.context.closePath();
	this.context.stroke();
}

// vertical grid lines
for(var j = 0; j <= this.canvas.width; j = j + gridPixelSize)
{
	this.context.beginPath();
	this.context.moveTo(j, 0);
	this.context.lineTo(j, this.canvas.height);
	this.context.closePath();
	this.context.stroke();
}

this.context.restore();

}
	drawAll(){
		this.clear();
		this.drawGrid(10, 'gray')
		this.shapeList.forEach((shape, index) =>{
			shape.draw();
		});
	}

	eventListener() {
        // Listen for mouse moves
        let that = this;
		this.canvas.addEventListener('click', function (event) {
			let rect = that.canvas.getBoundingClientRect(); 
			// that.clear();
			console.log(event);
			// that.drawAll();
			console.log("bahira");
			// console.log(event.clientX - rect.left);
            that.shapeList.forEach((shape, index) =>{

				
				console.log(event.clientX - rect.left);
				console.log(event.offsetX);
				 console.log((event.clientX - rect.left) / shape.sx - shape.tx, (event.clientY - rect.top) / shape.sy - shape.ty);
				// console.log(shape);
                if(that.context.isPointInPath(shape.getPath(), ((event.clientX - rect.left) - shape.tx) / shape.sx, ((event.clientY - rect.top) - shape.ty)) / shape.sy){
					console.log("Clicked shape: " + index);
					
					shape.draw();
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


let canvas;
window.onload = function(){
	// let canvas;
canvas = new Canvas('canvas');
canvas.drawGrid(10, 'gray');
console.log("hhaa");
	
}

export {canvas}; // Export created canvas so that other UI sections can interact





