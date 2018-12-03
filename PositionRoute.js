const express = require('express');

const PositionRouter = express.Router();

const Position = require('./Position');

PositionRouter.route('/create').post(function (req, res) {
	console.log(JSON.stringify(req.body))
	values = JSON.stringify(req.body)
            // use POST
	values = values.split(':');
	console.log(values)
  	const position = new Position({position:{'hour':values[0].substring(2), 'minute':values[1], 'fix_quality':values[2], 'speed':values[3], 'angle':values[4], 'lon':values[5], 'lat':values[6], 'altitude':values[7], 'external_temp':values[8].slice(0, -1)}});
  	position.save()
    .then(position => {
      res.json('Position added successfully');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = PositionRouter;