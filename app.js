const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./config.json');

bot.on('ready', () => {
	console.log(`Logged in as : ${bot.user.tag} | ID : ${bot.user.id}`);
	bot.user.setPresence({ game: { name: `Saber Developing me !`, type: 'WATCHING' }, status: 'online' });
});

bot.on('message', msg => {
	if (msg.author.bot || !msg.content.startsWith(cfg.prefix)) return;
	var args = msg.content.slice(cfg.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "ping") {
		const then = Date.now();
		msg.channel.send("Pong !").then(m => {
			m.edit(`Pong!, ${bot.ping}ms`);
		});
	}

	if (command === "kick") {
		if (!msg.member.permissions.has("ADMINISTRATOR")) return ;
		const member = msg.mentions.members.first();
		var reason = "";
		for (var i = 1; i < args.length; i++) {
			reason += " " + args[i];
		}
		if (!member) return msg.reply('Invaled usage , use ~kick `@user#1234` `<reason>`');
		member.send(`You have been kicked! by ${msg.author.tag} for ${reason}`);
		// .then(member.kick(reason));
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