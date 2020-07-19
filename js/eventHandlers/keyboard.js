/**
 * keyboard.js
 * This file contains keyboard event like copy, paste, delete shapes
 */

let ctrlC = false,
    copiedShape = null;

/**
 * Delete selected shape from DOM
 * @param {object} sv SVG drawing area DOM
 * @param {object} selectedShape  Currently selected shape
 */
function deleteShape(sv, selectedShape) {
    sv.removeChild(selectedShape);
}

/**
 * Copy selected shape
 * @param {object} sv SVG drawing area DOM
 * @param {object} selectedShape  Currently selected shape
 */
function copyShape(sv, selectedShape) {
    copiedShape = selectedShape.cloneNode(true);
}

/**
 *
 * @param {object} sv  SVG drawing area DOM
 */
function pasteShape(sv) {
    sv.append(copiedShape);
    shapeEventListener(copiedShape);

    // Since all the resize buttons are already drawn, add event handler to resize buttons
    document.querySelectorAll('.resize-button').forEach((element) => {
        let id = element.id;
        handleResize(sv, element, id);
    });
}

/**
 *
 * @param {object} svgObject Instance of SVG
 */
function keyBoardEventListener(svgObject) {
    window.addEventListener('keydown', (e) => {
        if (selectedShape) {
            // Delete Selected Shape on delete key dowm
            if (e.code == 'Delete') {
                deleteShape(svgObject.sv, selectedShape);
            }

            let c = e.keyCode;
            let ctrlDOwn = e.ctrlKey || e.metaKey; // Mac SUpport
            // Copy Shape on CTRL + C
            if (ctrlDOwn && c == 67) {
                copyShape(svgObject.sv, selectedShape);
                ctrlC = true; // Turn CtrlC flag on
            }

            // Paste Shape
            if (ctrlDOwn && c == 86) {
                pasteShape(svgObject.sv);
                ctrlC = false; // Disable CtrlC flag after pasting
            }
        }
    });
}
