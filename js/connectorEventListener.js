function connectorEventListener(svg){
   let circleButtons = svg.querySelectorAll('.point1, .point2');
   
   let selectedElement, offset, transform, pointElement, lineElement, correspondingPointElement;

   circleButtons.forEach((circleButton) => {
      circleButton.addEventListener('mousedown', startMove);
      circleButton.addEventListener('mousemove', updatePosition);
    circleButton.addEventListener('mouseup', endMove);
    circleButton.addEventListener('mouseleave', endMove);
   });
 

 
 function getMousePosition(evt) {
    let CTM = svg.getScreenCTM();
    return {
       x: (evt.clientX - CTM.e) / CTM.a,
       y: (evt.clientY - CTM.f) / CTM.d,
    };
 }

 

 function startMove(evt){
    console.log("Starting");
   if (evt.target.classList.contains('point1') || evt.target.classList.contains('point2')) {
      selectedElement = evt.target.parentNode;
      transform = getSVGAttribute(selectedElement, 'translate');
      if(transform){
         transform = transform.split(' ');
      }
      else{
         transform = [0, 0];
      }
   
      pointElement = evt.target;
      if(getSVGAttribute(pointElement, 'class') === 'point1'){
         correspondingPointElement = selectedElement.querySelector('.point2');
      }
      else{
         correspondingPointElement = selectedElement.querySelector('.point1');
      }
      lineElement = selectedElement.querySelector('.connector');
   }
 }

 function updatePosition(evt){
     let coord = getMousePosition(evt);
     
    if(selectedElement){
       console.log("Updating");
       evt.preventDefault();
      console.log("TX" , transform);
       
      setSVGAttributes(pointElement,{
          cx: coord.x - transform[0],
          cy: coord.y  - transform[1],
      });

       setSVGAttributes(lineElement, {
         x1: coord.x  - transform[0],
         y1: coord.y  - transform[1],
         x2: getSVGAttribute(correspondingPointElement, 'cx'),
         y2: getSVGAttribute(correspondingPointElement, 'cy'),

       })
    }
 }

 function endMove(evt){
    selectedElement = null;
 }
}