function getParentShape(el) {
   return el.parentNode;
}

function handleResize(sv, el, id) {
   let offset,
      transform,
      selectedElement,
      previous = {};
   el.addEventListener('mousedown', startResize);
   el.addEventListener('mousemove', resize);
   el.addEventListener('mouseup', stopResize);
   el.addEventListener('mouseleave', stopResize);

   function getMousePosition(evt) {
      let CTM = sv.getScreenCTM();
      return {
         x: (evt.clientX - CTM.e) / CTM.a,
         y: (evt.clientY - CTM.f) / CTM.d,
      };
   }

   function initialiseDragging(evt) {
      offset = getMousePosition(evt);

      // Make sure the first transform on the element is a translate transform
      var transforms = selectedElement.transform.baseVal;

      if (
         transforms.length === 0 ||
         transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
      ) {
         // Create an transform that translates by (0, 0)
         var translate = sv.createSVGTransform();
         translate.setTranslate(0, 0);
         selectedElement.transform.baseVal.insertItemBefore(translate, 0);
      }

      // Get initial translation
      transform = transforms.getItem(0);
      offset.x -= transform.matrix.e;
      offset.y -= transform.matrix.f;
   }

   function startResize(evt) {
      selectedElement = getParentShape(el);
      let coord = getMousePosition(evt);

      // Set previous coordinate to calculate scale after mouse is move
      previous = coord;
      initialiseDragging(evt);
   }

   function resize(evt) {
      
      if (selectedElement) {
         evt.preventDefault();
         let coord = getMousePosition(evt);

         transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
         // Apply translation on dragging
         selectedElement.setAttributeNS(
            null,
            'translate',
            coord.x - offset.x + ' ' + (coord.y - offset.y)
         );

         let actualShape = selectedElement.querySelector('.actual-shape');
         let { x, y, width, height } = actualShape.getBBox();
         
         // Get direction of button from id
         let buttonDir = id.split('-')[0];
         let {parityX, parityY} = PARITY[buttonDir];

         // Calculate how much distance has been moved
         let deltaX = parityX * (previous.x - coord.x);
         let deltaY = parityY * (previous.y - coord.y);
      
         previous = coord;
         
         for (let element of actualShape.children) {
            let [scaleX, scaleY] = element
               .getAttributeNS(null, 'scale')
               .split(' ');
               
            // Set new scale factor to teh actual shape
            let newScaleX = (width - deltaX) / (width / scaleX);
            let newScaleY = (height - deltaY) / (height / scaleY);
            setNewScale(element, newScaleX, newScaleY);
         }
      }
   }

   function setNewScale(element, newScaleX, newScaleY){
      element.setAttributeNS(
         null,
         'scale',
         `${newScaleX} ${newScaleY}`
      );

      element.setAttributeNS(
         null,
         'transform',
         `scale(${newScaleX} ${newScaleY})`
      );
   }
   function stopResize(evt) {
      selectedElement = false;
   }
}