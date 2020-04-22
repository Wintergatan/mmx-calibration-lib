const makerjs = require('makerjs');

const distanceBetweenRods = 5;
const plateWidth = 798;
const plateHeight = 20 + distanceBetweenRods*256;

exports.default = function draw(music) {

  const instrumentsModel = {
    models: [],
    origin: [10, 10]
  }

  instrumentsModel.models = Object.keys(music).map((instrument, instrumentIndex) => {
    const instrumentModel = {
      paths: [],
      origin: [instrumentIndex * 10, 0]
    }
    music[instrument].reverse().forEach((note, noteindex) => {
      if (note) {
        const y = noteindex * distanceBetweenRods
        instrumentModel.paths.push({
          type: 'circle',
          origin: [0, y],
          radius: 2.5
        })
      }
    });
    return instrumentModel
  })

  const plate = new makerjs.models.Rectangle(plateWidth, plateHeight);

  const model = {
    models: [
      instrumentsModel,
      plate
    ]
  };

  const options = {
    units: "mm"
  };

  return {
    svg: makerjs.exporter.toSVG(model, options),
    dxf: makerjs.exporter.toDXF(model, options)
  };
}