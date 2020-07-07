<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
</head>
<body>
<canvas id="myCanvas" width="400" height="400" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>
<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function drawBezierOvalQuarter(centerX, centerY, sizeX, sizeY) {
    ctx.beginPath();
    ctx.moveTo(
    	centerX - (sizeX),
        centerY - (0)
    );
    ctx.bezierCurveTo(
    	centerX - (sizeX),
        centerY - (0.552 * sizeY),
        centerX - (0.552 * sizeX),
        centerY - (sizeY),
        centerX - (0),
        centerY - (sizeY)
    );
	ctx.stroke();
}

function drawBezierOval(centerX, centerY, sizeX, sizeY) {
    drawBezierOvalQuarter(centerX, centerY, -sizeX, sizeY);
    drawBezierOvalQuarter(centerX, centerY, sizeX, sizeY);
    drawBezierOvalQuarter(centerX, centerY, sizeX, -sizeY);
    drawBezierOvalQuarter(centerX, centerY, -sizeX, -sizeY);
}

function drawBezierCircle(centerX, centerY, size) {
    drawBezierOval(centerX, centerY, size, size)
}

drawBezierCircle(200, 200, 64)
</script>
</body>
</html>