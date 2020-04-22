const parse = require('./lib/parse').default;
const draw = require('./lib/draw').default;
const convertToMidi = require('./lib/convertToMidi').default;

exports.draw = draw;
exports.parse = parse;
exports.convertToMidi = convertToMidi;