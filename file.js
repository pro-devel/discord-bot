/**
 * Send a user a link to their avatar
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// reading bot configuration .
const cfg = require('./config.json');
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
 client.on('ready', () => {
 	console.log('I am ready!');
 });


// Create an event listener for messages
client.on('message', message => {

	if (message.author.bot || !message.content.startsWith(cfg.prefix)) return;
	const args = message.content.slice(cfg.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

  // If the message is "what is my avatar"
  if (message.content === 'what is my avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
}

// displaying a presence to the bot status .
if (message.content === 'init') {
	//checking if the user is admin .
	if (message.member.permissions.has("ADMINISTRATOR")) {
		// replying back with a msg .
		message.reply('Updating my status');
    // settings presence .
    client.user.setPresence({ game: { name: `${message.author.username} Developing me !`, type: 'WATCHING' }, status: 'online' })
    .then()
    .catch(console.error);
}else {
	message.reply('Only Admins can run this command .');
}
}

//joining voice channel .
if (message.content === 'play') {
    // getting the currently joined voice channel of the msg sender .
    if (message.member.voiceChannel) {
    	message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
        	message.reply('I have successfully connected to the channel!');
        	// const dispatcher = connection.playFile('./music.mp3');
          // ReadableStreams, in this example YouTube audio
          const ytdl = require('ytdl-core');
          connection.playStream(ytdl(
          	'https://www.youtube.com/watch?v=ZlAU_w7-Xp8',
          	{ filter: 'audioonly' }));
      })
        .catch(console.log);
    } else {
    	message.reply('You need to join a voice channel first!');
    }

}

// leaving voice channel .
if (message.content === 'stop') {
    // Send the user's avatar URL
    if (message.member.voiceChannel) {
    	message.member.voiceChannel.leave();
    } else {
    	message.reply('You need to join a voice channel first!');
    }
}

});


// Greeting the new joined member
client.on('guildMemberAdd', member => {
	setTimeout(function () {
         // Send the message to a designated channel on a server:
         const channel = member.guild.channels.find(ch => ch.name === 'general');
		  // Do nothing if the channel wasn't found on this server
		  if (!channel) return;
		  // Send the message, mentioning the member
		  channel.send(`Have you seen my bear Tibbers ${member} ? :smiling_imp: `);
		}, 5000);
});



// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(cfg.token);