export class BoundingBox {
    /**
     *
     * @param {object} props  properties for bounding box
     */
    constructor(props = {}) {
        const {
            scale,
            rotate,
            translate,
            fill = 'none',
            stroke = 'blue',
            strokeWidth = '2',
            strokeDashArray = '4'
        } = props;

        this.fill = fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.strokeDashArray = strokeDashArray;

        // Get transformation attributes of parent g element
        this.scale = scale;
        this.rotate = rotate;
        this.translate = translate;

        this.box = document.createElementNS(SVGNS, 'rect');
        // Bounding box attributes
        setSVGAttributes(this.box, {
            fill: fill,
            stroke: stroke,
            class: 'bounding-box',
            'stroke-width': strokeWidth,
            'stroke-dasharray': strokeDashArray
        });
    }

    /**
     * Returns bounding box HTML element
     */
    getBoundingBox() {
        return this.box;
    }
}
