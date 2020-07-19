import { Shape } from './Shape.js';

export class CustomShape extends Shape {
    constructor(props = {}) {
        super(props);
        const { children, scale = '1 1' } = props;

        this.scale = scale;
        this.shapeElements = [];

        children.forEach((child) => {
            const key = Object.keys(child)[0];
            this.createElement(key, child[key]);
        });
    }

    createElement(key, props = {}) {
        let path = document.createElementNS(SVGNS, key);
        this.setProperties(path, props);
    }

    setProperties(path, props) {
        for (const [key, value] of Object.entries(props)) {
            setSVGAttribute(path, key, value);
        }
        this.shapeElements.push(path);
    }
}
