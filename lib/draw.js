const makerjs = require('makerjs');

let distanceBetweenRods = 5;
let plateWidth = 798;
let plateHeight = 1300;
let distanceBetweenChannels = 10;
let rodRadius = 2.5;
let origin = [10, 10];

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
  if (options.distanceBetweenChannels) {
    distanceBetweenChannels = options.distanceBetweenChannels;
  }
  if (options.rodRadius) {
    rodRadius = options.rodRadius;
  }
  if (options.origin) {
    origin = options.origin;
  }

  const instrumentsModel = {
    models: [],
    origin: origin,
  };

  instrumentsModel.models = Object.keys(music).map(
    (instrument, instrumentIndex) => {
      const instrumentModel = {
        paths: [],
        origin: [instrumentIndex * distanceBetweenChannels, 0],
      };
      music[instrument].reverse().forEach((note, noteindex) => {
        if (note) {
          const y = noteindex * distanceBetweenRods;
          instrumentModel.paths.push({
            type: 'circle',
            origin: [0, y],
            radius: rodRadius,
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
