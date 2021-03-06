const express    = require('express');
const session    = require('express-session');
const db         = require('../db/db-config.js');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(session({
  secret: 'worst kept secret',
  resave: true,
  saveUninitialized: true
}));

let port = process.env.PORT || 3000;

server.use(express.static('./client'));
server.use(express.static('./compiled'));

server.listen(port);
module.exports = server;
require('./routes.js')(server, express);
