var MidiWriter = require('midi-writer-js');
const instruments = require('./instruments').default

const beat = 128;
const scale = 32;

const pitch = {
  vibraLeft1: "C4",
  vibraRight1: "C4",
  vibraLeft2: "D4",
  vibraRight2: "D4",
  vibraLeft3: "E4",
  vibraRight3: "E4",
  vibraLeft4: "F4",
  vibraRight4: "F4",
  vibraLeft5: "G4",
  vibraRight5: "G4",
  vibraLeft6: "A5",
  vibraRight6: "A5",
  vibraLeft7: "B5",
  vibraRight7: "B5",
  vibraLeft8: "C5",
  vibraRight8: "C5",
  vibraLeft9: "D5",
  vibraRight9: "D5",
  vibraLeft10: "E5",
  vibraRight10: "E5",
  vibraLeft11: "F5",
  vibraRight11: "F5",
  cymbalL: "C0",
  cymbalR: "C0",
  kickL: "D0",
  kickR: "D0",
  snareL: "E0",
  snareR: "E0",
  hihatL: "F0",
  hihatR: "F0",
  bassL1: "E1",
  bassR1: "E1",
  bassL2: "A1",
  bassR2: "A1",
  bassL3: "D2",
  bassR3: "D2",
  bassL4: "G2",
  bassR4: "G2"
}

exports.default = function convertToMidi(musicData) {
  const tracks = Object.keys(musicData).map(instrument => {
    const track = new MidiWriter.Track();
    track.addTrackName(instruments[instrument]);
    musicData[instrument].forEach((note, index) => {
      if (note) {
        track.addEvent(new MidiWriter.NoteEvent({
          pitch: [pitch[instrument]],
          duration: '4',
          startTick: index * scale
        }))
      }
    });
    return track;
  })
  var write = new MidiWriter.Writer(tracks);
  console.log("Music data successfully converted to midi file");
  return write.buildFile()
}