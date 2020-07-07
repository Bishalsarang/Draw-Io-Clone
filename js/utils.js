class BezierCircle{
    constructor(centerX, centerY, radius) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;        
    }

    
    drawBezierCircle() {
        drawBezierOval(centerX, centerY, this.radius, this.radius);
    }



    
}

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
}

function drawBezierOval(centerX, centerY, sizeX, sizeY) {
    drawBezierOvalQuarter(centerX, centerY, -sizeX, sizeY);
    drawBezierOvalQuarter(centerX, centerY, sizeX, sizeY);
    drawBezierOvalQuarter(centerX, centerY, sizeX, -sizeY);
    drawBezierOvalQuarter(centerX, centerY, -sizeX, -sizeY);
}

