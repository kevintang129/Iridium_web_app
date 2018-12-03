const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const JSON = require('circular-json');
var path = require("path");
const Schema = mongoose.Schema;


const app = express();
const PORT = process.env.PORT || 3000;
const url = 'https://rockblock.herokuapp.com/'

const config = require('./db');
const PositionRoute = require('./PositionRoute');
const Position = require('./Position');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
var model = mongoose.model('Position', Position[1])

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/position', PositionRoute);

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });
console.log(typeof db)
app.get('', function(req, res){
	model.find().exec(function(err, leads){
	res.send(leads);
	})});

app.listen(url, () => {
  console.log('Server is running on PORT:',PORT);
});