'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _main = require('./routes/main.routes');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

//db

_mongoose2.default.Promise = global.Promise;
app.set('database', process.env.MONGODB_URI || 'mongodb://admin:admin@ds062339.mlab.com:62339/piperdb');
//const uri = 'localhost/books';
_mongoose2.default.connect(app.get('database')).then(function () {
  return console.log('connection succesful');
}).catch(function (err) {
  return console.error(err);
});

app.use('/api/v1', _main2.default);

app.set('port', process.env.PORT || 3005);
// arrow functions

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});