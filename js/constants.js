const SVGNS = 'http://www.w3.org/2000/svg';

const BACKGROUND_COLOR = '#EBEBEB';
const CANVAS_BOUNDARY_COLOR = '#F5F5F5';

const SVG_WIDTH = 800;
const SVG_HEIGHT = 800;


const RESIZE_BUTTON_RADIUS = 5;

const ROTATE_BUTTON_OFFSET_X = 40;
const ROTATE_BUTTON_OFFSET_Y = 40;
// To handle scaling up or down depending on the button
const PARITY = {
   nw: { parityX: -1, parityY: -1 },
   n: { parityX: 0, parityY: -1 },
   ne: { parityX: 1, parityY: -1 },
   w: { parityX: -1, parityY: 0 },
   e: { parityX: 1, parityY: 0 },
   sw: { parityX: -1, parityY: 1 },
   s: { parityX: 0, parityY: 1 },
   se: { parityX: 1, parityY: 1 },
};


const RESIZE_CURSOR = [
   'nw-resize',
   'n-resize',
   'ne-resize',
   'w-resize',
   'e-resize',
   'sw-resize',
   's-resize',
   'se-resize',
];

const DELTA = 0.9;