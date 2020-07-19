/**
 *
 * @param {*} element
 * @param {*} key
 * @param {*} value
 */
function setSVGAttribute(element, key, value) {
	element.setAttributeNS(null, key, value);
}

/**
 *
 * @param {object} element SVG ELement in which we want to add attributes
 * @param {object} props All the attributes we want to set
 */
function setSVGAttributes(element, props) {
	for (const [key, value] of Object.entries(props)) {
		setSVGAttribute(element, key, value);
	}
}

/**
 *
 * @param {*} element
 * @param {*} key
 * @param {*} value
 */
function setCSSAttribute(element, key, value) {
	element.style[key] = value;
}

/**
 *
 * @param {*} element
 * @param {Object} props
 */
function setCSSAttributes(element, props) {
	for (const [key, value] of Object.entries(props)) {
		setCSSAttribute(element, key, value);
	}
}

/**
 *
 * @param {*} element
 * @param {*} key
 */
function getSVGAttribute(element, key) {
	return element.getAttributeNS(null, key);
}

/**
 *
 * @param {*} element
 * @param {*} key
 */
function getCSSAttribute(element, key) {
	return window.getComputedStyle(element).getPropertyValue(key);
}

/**
 *
 * @param {*} element
 * @param {*} key
 */
function getHTMLAttribute(element, key) {
	return element.getAttribute(key);
}

/**
 *
 * @param {*} element
 * @param {*} key
 */
function removeSVGAttribute(element, key) {
	element.removeAttributeNS(null, key);
}

/**
 *
 * @param {*} element
 * @param {*} atributeList
 */
function removeSVGAttributes(element, atributeList) {
	for (const key of atributeList) {
		removeSVGAttribute(element, key);
	}
}

/**
 *
 */
function getCurrentTimeStamp() {
	let currentdate = new Date();
	return (
		currentdate.getDate() +
		'/' +
		(currentdate.getMonth() + 1) +
		'/' +
		currentdate.getFullYear() +
		' @ ' +
		currentdate.getHours() +
		':' +
		currentdate.getMinutes() +
		':' +
		currentdate.getSeconds()
	);
}
