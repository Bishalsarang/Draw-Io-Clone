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


/**
 * 
 * @param {*} element 
 * @param {*} key 
 * @param {*} value 
 */
function setCSSAttribute(element, key, value){
    element.style[key] = value;
}


/**
 * 
 * @param {*} element 
 * @param {*} props 
 */
function setCSSAttributes(element, props){
    for(const [key, value] of Object.entries(props)){
        setCSSAttribute(element, key, value);
     }
}


function getCurrentTimeStamp(){
    let currentdate = new Date(); 
    
    return currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
}