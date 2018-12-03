const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const JSON = require('circular-json');
var path = require("path");
const Schema = mongoose.Schema;
console.log(process.env.MONGOLAB_URI)

var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://localhost/HelloMongoose';

const app = express();
const PORT = process.env.PORT || 3000;

const config = require('./db');
const PositionRoute = require('./PositionRoute');
const Position = require('./Position');

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname,'index.html'));
});
if (process.env.NODE_ENV === 'production') {
	app.use(express.static());
}

mongoose.connect(uristring, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
var model = mongoose.model('Position', Position[1])
console.log('model made')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/position', PositionRoute);
console.log('position ok')
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