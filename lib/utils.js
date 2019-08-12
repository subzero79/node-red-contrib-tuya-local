/**
 * Renames an object keys.
 * @param {Object} obj input object
 * @param {Object} newKeys renaming object
 * @returns {Object}
 */
function keyRename(obj, newKeys) {
	const keyValues = Object.keys(obj).map(key => {
	const newKey = newKeys[key] || key;
	return { [newKey]: obj[key] };
	});
	return Object.assign({}, ...keyValues);
}


/**
 * Returns human time stamp, no date.
 * @param none
 * @returns string
 */
function getHumanTimeStamp() {
	return new Date().toLocaleTimeString( 'en-US',{
		hour12: false
	});
}

/**
 * Checks for a valid json string
 * @param str string
 * @returns boolean
 */
function checkValidJSON(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

/**
 * Filters out data messages that have specific commandBytes values
 * @param str string
 * @param cmd_bytes string
 * @returns object or null
 */
function filterCommandByte(msg,cmd_bytes) {
	arr = cmd_bytes.replace(/\s/g,"").split(",");
	arr = arr.map(function (x) { 
  		return parseInt(x, 10); 
	});
	return (arr.includes(msg.commandByte)) ? null : msg;
}

module.exports = {keyRename,getHumanTimeStamp,checkValidJSON,filterCommandByte};
