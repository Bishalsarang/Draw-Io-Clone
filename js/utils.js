/**
 * 
 */
function setSVGAttribute(element, key, value){
    element.setAttributeNS(null, key, value)
}


/**
 * 
 * @param {} element SVG ELement in which we want to add attributes
 * @param {Object} props All the attributes we want to set
 */
function setSVGAttributes(element, props){
    for(const [key, value] of Object.entries(props)){
        setSVGAttribute(element, key, value);
     }
}


function setCSSAttribute(element, key, value){
    element.style[key] = value;
}

function setCSSAttributes(element, props){
    for(const [key, value] of Object.entries(props)){
        setCSSAttribute(element, key, value);
     }
}