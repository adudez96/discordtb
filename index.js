var Discordie = require('discordie');

var http = require('http');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	return res.send('Hello there');
});

var nconf = require('nconf');
nconf.file({ file: './config.json' });

var Events = Discordie.Events;
var client = new Discordie();

client.connect({
	token: nconf.get('discord:token')
});

client.Dispatcher.on(Events.GATEWAY_READY, function (e) {
	console.log('Connected as: ' + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, function (e) {
	if (e.message.content == 'PING') {
		e.message.channel.sendMessage('PONG');
	} else if (e.message.content == 'DONG') {
		e.message.channel.sendMessage('fuck off dong, or do the dance')
	}
});

var httpServer = http.createServer(app).listen(9000, function () {
	console.log('HTTP express server connected at port 9000');
});
