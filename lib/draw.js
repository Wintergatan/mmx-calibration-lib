const makerjs = require('makerjs');

exports.default = function draw(music) {
  var line = {
    type: 'line',
    origin: [0, 0],
    end: [50, 50]
  };

  var circle = {
    type: 'circle',
    origin: [0, 0],
    radius: 50
  };
  var circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({
    type: 'circle',
    origin: [i * 100, 10],
    radius: 5
  }))

  var pathObject = [line, circle];

  var model = {
    paths: circles
  };

  return makerjs.exporter.toSVG(model);
}