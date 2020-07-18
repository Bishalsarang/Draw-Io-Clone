let ConnectorInfo = {
   Line:{
      children:[
         {
            line:{
               class: "connector",
               x1: "10",
               y1: "10",
               x2: "80",
               y2: "80",
              
            }
         },
         {
            circle:{
               class: "point1",
               cx: "10",
               cy: "10",
               r: "5",
               "cursor": "pointer",
            }
         },
         {
            circle:{
               class: "point2",
               cx: "80",
               cy: "80",
               r: "5",
               "cursor": "pointer",
            } 
         }
      ]
   },
   DashedLine:{
      children:[
         {
            path: {
               d: "M 10 10 L 28.62 1.06"
            }
         }
      ]
   }


}