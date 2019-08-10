/**
 * Renames an object keys.
 * @private
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