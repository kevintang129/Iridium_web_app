const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const JSON = require('circular-json');
var path = require("path");
const Schema = mongoose.Schema;

var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://localhost/HelloMongoose';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

const config = require('./db');
const PositionRoute = require('./PositionRoute');
const Position = require('./Position');
app.use('/position', PositionRoute);


mongoose.connect(uristring, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

var model = mongoose.model('Position', Position[1])
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });
app.get('', function(req, res){
	model.find().exec(function(err, leads){
	res.send(leads);
	})});
app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});