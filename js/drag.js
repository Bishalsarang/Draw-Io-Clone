export function makeDraggable() {
    sv.sv.addEventListener('mousedown', startDrag);
    sv.sv.addEventListener('mousemove', drag);
    sv.sv.addEventListener('mouseup', endDrag);
    sv.sv.addEventListener('mouseleave', endDrag);
    sv.sv.addEventListener('touchstart', startDrag);


    function getMousePosition(evt) {
      var CTM = sv.sv.getScreenCTM();
      if (evt.touches) { evt = evt.touches[0]; }
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }

    var selectedElement, offset, transform;

    function initialiseDragging(evt) {
        offset = getMousePosition(evt);

        // Make sure the first transform on the element is a translate transform
        var transforms = selectedElement.transform.baseVal;

        if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
          // Create an transform that translates by (0, 0)
          var translate = sv.sv.createSVGTransform();
          translate.setTranslate(0, 0);
          selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }

        // Get initial translation
        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
    }

    function startDrag(evt) {
      if (evt.target.classList.contains('draggable')) {
        selectedElement = evt.target;
        initialiseDragging(evt);
      } else if (evt.target.parentNode.classList.contains('draggable-group')) {
        selectedElement = evt.target.parentNode;
        initialiseDragging(evt);
      }
    }

    function drag(evt) {
      if (selectedElement) {
        evt.preventDefault();
        var coord = getMousePosition(evt);
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      }
    }

    function endDrag(evt) {
      selectedElement = false;
    }
  }
