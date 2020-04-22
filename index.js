const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const parse = require('./lib/parse').default;
const draw = require('./lib/draw').default;
const convertToMidi = require('./lib/convertToMidi').default;

console.log("Wintergatan Programming templates converter");
console.log("===========================================");
if (argv._.length !== 1 || (!argv.svg && !argv.midi)) {
  console.log("Usage: node index.js input.csv --svg output.svg --midi output.midi");
  console.log("You can either supply svg, midi or both.");
} else {
  parse(argv._[0], musicData => {
    if (argv.svg) {
      const svg = draw(musicData);
      fs.writeFileSync(argv.svg, svg)
      console.log("SVG written to '" + argv.svg + "'");
    }
    if (argv.midi) {
      const midi = convertToMidi(musicData);
      fs.writeFileSync("./output/midi.midi", midi)
      console.log("MIDI written to '" + argv.midi + "'");
    }
  })
}