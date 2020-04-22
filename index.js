const fs = require('fs');
const parse = require('./lib/parse').default;
const draw = require('./lib/draw').default;
const convertToMidi = require('./lib/convertToMidi').default;

parse('./input/calibration_sheet.csv', musicData => {
  const svg = draw(musicData);
  const midi = convertToMidi(musicData);
  fs.writeFileSync("./output/export.svg", svg)
  console.log("SVG written to './output/export.svg'");
  fs.writeFileSync("./output/midi.midi", midi)
  console.log("MIDI written to './output/midi.midi'");
})