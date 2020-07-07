import {canvas} from './app.js'
 
// Get all buttons in DOM that creates different shapes
let allShapesBtn = document.querySelectorAll('.btn-shapes');

// Add event handler for each button
allShapesBtn.forEach((button, index) => {
	button.addEventListener('click', () => {
		let shape = canvas.createShape(index);
		console.log('You have ' + canvas.shapeList.length + ' shapes.');
	});
});