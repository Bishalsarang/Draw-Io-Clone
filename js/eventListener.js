import { canvas } from './app.js';

let startX, startY;
let selectedShapeIndex;
let isDragging = false;

canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;

// Check if mouse pointer is inside the shape
function isMouseInShape(mx, my, shape) {
	return canvas.context.isPointInPath(shape.getPath(), mx, my);
}

function handleMouseDown(e) {
	e.preventDefault();
	e.stopPropagation();

	startX = parseInt(e.offsetX);
	startY = parseInt(e.offsetY);

	for (let i = 0; i < canvas.shapeList.length(); i++) {
		//TODO: Overlapping shape ko lagi z indez use garera drag garney
		if (isMouseInShape(startX, startY, canvas.shapeList[i])) {
			selectedShapeIndex = i;
			isDragging = true;

			return;
		}
	}
}

function handleMouseUp(e) {
	if (!isDragging) {
		return;
	}
	e.preventDefault();
	e.stopPropagation();
	isDragging = false;
}

function handleMouseOut(e) {
	if (!isDragging) {
		return;
	}
	e.preventDefault();
	e.stopPropagation();
	isDragging = false;
}

function handleMouseMove(e) {
	if (!isDragging) {
		return;
	}
	e.preventDefault();
	e.stopPropagation();

	let mouseX = parseInt(e.offsetX);
	let mouseY = parseInt(e.offsetY);

	let draggedX = mouseX - startX;
	let draggedY = mouseY - startY;

	let selectedShape = canvas.shapeList[selectedShapeIndex];
	selectedShape.tx += draggedX;
	selectedShape.ty = draggedY;

	canvas.clear();
	selectedShape.draw();

	startX = mouseX;
	startY = mouseY;
}
// // eventListener() {
// //     // Listen for mouse moves
// //     let that = this;
// //     this.canvas.addEventListener('click', function (event) {
// //         let rect = that.canvas.getBoundingClientRect();
// //         // that.clear();
// //         console.log(event);
// //         // that.drawAll();
// //         console.log("bahira");
// //         // console.log(event.clientX - rect.left);
// //         that.shapeList.forEach((shape, index) =>{

// //             console.log(event.clientX - rect.left);
// //             console.log(event.offsetX);
// //              console.log((event.clientX - rect.left) / shape.sx - shape.tx, (event.clientY - rect.top) / shape.sy - shape.ty);
// //             // console.log(shape);
// //             if(that.context.isPointInPath(shape.getPath(), ((event.clientX - rect.left) - shape.tx) / shape.sx, ((event.clientY - rect.top) - shape.ty)) / shape.sy){
// //                 console.log("Clicked shape: " + index);

// //                 shape.draw();
// //                 that.context.fillStyle = 'red';
// //             }
// //             else{
// //                 that.context.fillStyle = 'blue';
// //             }
// //             // that.context.restore();

// //             // shape.draw();
// //         })
// //     });

// //     // Exporting Image as PNG
// //     var button = document.querySelector('.btn-save');
// //     button.addEventListener('click', function (e) {
// //         var dataURL = that.canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
// //         button.setAttribute('href', dataURL);
// // });
// // }
