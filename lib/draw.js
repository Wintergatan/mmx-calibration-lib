const makerjs = require('makerjs');

let distanceBetweenRods = 5;
let plateWidth = 798;
let plateHeight = 1300;

exports.default = function draw(music, options = {}) {
  if (options.distanceBetweenRods) {
    distanceBetweenRods = options.distanceBetweenRods;
  }
  if (options.plateWidth) {
    plateWidth = options.plateWidth;
  }
  if (options.plateHeight) {
    plateHeight = options.plateHeight;
  }

  const instrumentsModel = {
    models: [],
    origin: [10, 10],
  };

  instrumentsModel.models = Object.keys(music).map(
    (instrument, instrumentIndex) => {
      const instrumentModel = {
        paths: [],
        origin: [instrumentIndex * 10, 0],
      };
      music[instrument].reverse().forEach((note, noteindex) => {
        if (note) {
          const y = noteindex * distanceBetweenRods;
          instrumentModel.paths.push({
            type: 'circle',
            origin: [0, y],
            radius: 2.5,
          });
        }
      });
      return instrumentModel;
    }
  );

  const plate = new makerjs.models.Rectangle(plateWidth, plateHeight);

  const model = {
    models: [instrumentsModel, plate],
  };

  const drawOptions = {
    units: 'mm',
  };

  return {
    svg: makerjs.exporter.toSVG(model, drawOptions),
    dxf: makerjs.exporter.toDXF(model, drawOptions),
  };
};
