// Project: AKACHAIN
// Desc: 	Entry file of Web api server
// History: Create new 2019/01/17 

'use strict';
global.log4js = require('log4js');
global.logger = log4js.getLogger('SupplyChainDApp');

var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const socketIo = require("socket.io");

var http = require('http');
var util = require('util');
var cors = require('cors');

const fs = require('fs');
var hfc = require('fabric-client');

var app = express();

// Read config
require('./config.js');
var host = process.env.HOST || hfc.getConfigSetting('host');
var port = process.env.PORT || hfc.getConfigSetting('port');

// Router include
var userRouter = require('./router/userRouter');
var googleFormRouter = require('./router/googleFormRouter');
var emailRouter = require('./router/emailRouter');

// Allow cors
app.options('*', cors());
app.use(cors());

// Support parsing of application/json type post data
app.use(bodyParser.json());
// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
	extended: false
}));

// Route config
app.use('/api/user', userRouter);
app.use('/api/googleForm', googleFormRouter);
app.use('/api/email', emailRouter);


// Start server
const server = http.Server(app);
const io = socketIo(server);
exports.io = io

io.on('connection', function (socket) {
	logger.info("One client joined")
});

server.listen(port);
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  http://%s:%s  ******************', host, port);
server.timeout = 240000;