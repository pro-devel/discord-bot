const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./config.json');
const YouTube = require('simple-youtube-api');
const ytapi = new YouTube(`${cfg.api_key}`);
const ytdl = require('ytdl-core');

bot.on('ready', () => {
	console.log(`Logged in as : ${bot.user.tag} | ID : ${bot.user.id}`);
	bot.user.setPresence({
		game: {
			name: `Saber Developing me !`,
			type: 'WATCHING'
		},
		status: 'online'
	});
});

bot.on('message', msg => {
	if (msg.author.bot || !msg.content.startsWith(cfg.prefix)) return;
	var args = msg.content.slice(cfg.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "ping") {
		const then = Date.now();
		msg.channel.send("Pong !").then(m => {
			m.edit(`Pong!, ${bot.ping}ms`);
			msg.delete();
		});
	}

	if (command === "kick") {
		if (!msg.member.permissions.has("ADMINISTRATOR")) return;
		const member = msg.mentions.members.first();
		var reason = "";
		for (var i = 1; i < args.length; i++) {
			reason += " " + args[i];
		}
		if (!member) return msg.reply('Invaled usage , use ~kick `@user#1234` `<reason>`');
		member.send(`You have been kicked! by ${msg.author.tag} for ${reason}`);
		// .then(member.kick(reason));
	}


	if (command === 'play') {
		if (msg.member.voiceChannel) {
			msg.member.voiceChannel.join()
				.then(connection => {
					if (args.length >= 1) {
						var queue = "";
						for (var i = 0; i < args.length; i++) {
							queue += " " + args[i];
						}
						ytapi.searchVideos(queue).then(r => {
							msg.channel.send(`Currently Playing : ${r[0].title}`);
							connection.playStream(ytdl(
								r[0].url, {
									filter: 'audioonly'
								}));

						}).catch(console.error);

						// connection.playFile('./music.mp3');
					} else {
						msg.reply('Invalid usage , use `~play <url>`');
					}
				})
				.catch(console.log);
		} else {
			msg.reply('You need to join a voice channel first!');
		}

	}


	if (command === 'stop') {
		if (msg.member.voiceChannel) {
			msg.member.voiceChannel.leave();
		} else {
			msg.reply('You need to join a voice channel first!');
		}
	}

	if (command == "annie") {
		var words = "";
		for (var i = 0; i < args.length; i++) {
			words += " " + args[i];
		}
		msg.reply(words);
	}

	if (command === "yt") {

	}

});



// Greeting the new joined member
bot.on('guildMemberAdd', member => {
	setTimeout(function () {
		// Send the message to a designated channel on a server:
		const channel = member.guild.channels.find(ch => ch.name === 'general');
		// Do nothing if the channel wasn't found on this server
		if (!channel) return;
		// Send the message, mentioning the member
		channel.send(`Have you seen my bear Tibbers ${member} ? :smiling_imp: `);
	}, 5000);
});


bot.login(cfg.token);