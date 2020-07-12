function resizeEventHandler(){
   // nw:  change x and y
   // n: change y
   // ne: change x and y

   // w: change x
   // e: change x

   // sw: change x and y
   // s: change y
   // se: change x and y
   let buttons = ['nw', 'ne', 'sw', 'se'];
   buttons.forEach((button, index) => {
      let el = document.getElementById(button);
      el.addEventListener('click'){
         console.log("cliccc");
      }
   });
}