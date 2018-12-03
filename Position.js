const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Position = new Schema({
  position: {
    'hour': {type: String},
    'minute': {type: String},
    'fix_quality': {type: String},
    'speed': {type: String},
    'angle': {type: String},
    'lon': {type: String},
    'lat': {type: String},
    'altitude': {type: String},
    'external_temp': {type: String},
  },
},{
    collection: 'positions'
});

module.exports = mongoose.model('Position', Position);