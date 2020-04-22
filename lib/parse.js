const csv = require('csv-parser');
const fs = require('fs');
const instruments = require('./instruments').default

exports.default = function parse(filename, callback) {
  const music = {}

  Object.keys(instruments).forEach(instrument => {
    music[instrument] = []
  })

  fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (row) => {
      // Skip first data row
      if (row["VIBRA LEFT 1"] === "CHANNEL 1") {
        return
      }

      Object.keys(instruments).forEach(instrument => {
        const instrumentName = instruments[instrument];
        let value = false;
        const x = row[instrumentName]
        if (x === "NOTE HERE") {
          value = true;
        }
        music[instrument][row.Slot - 1] = value
      })
    })
    .on('end', () => {
      console.log('CSV file successfully processed and converted');
      // console.log(music);
      callback(music);
    });
}