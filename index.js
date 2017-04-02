var Discordie = require('discordie');

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
	}
});
