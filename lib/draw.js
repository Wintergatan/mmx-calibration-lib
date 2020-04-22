const makerjs = require('makerjs');

const plateWidth = 798;
const plateHeight = 2000;
const distanceBetweenRods = 5;

exports.default = function draw(music) {
  //console.log(Object.keys(music));

  let vibraLeft1Path = []
  music.vibraLeft1.reverse().forEach((note, noteindex) => {
    if (note) {
      const x = 0;
      const y = noteindex * distanceBetweenRods
      console.log(y);
      vibraLeft1Path.push({
        type: 'circle',
        origin: [x, y],
        radius: 2.5
      })
    }
  });

  const plate = new makerjs.models.Rectangle(plateWidth, plateHeight);

  const model = {
    models:[
      {paths: vibraLeft1Path},
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
  /*var line = {
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

  return makerjs.exporter.toSVG(model);*/
}