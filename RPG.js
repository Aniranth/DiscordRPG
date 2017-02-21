var Discordie = require("discordie");
const Dice = require("./DiscordIF/Dice");
var Player = require('./DiscordIF/player.js');
var Events = Discordie.Events;

var client = new Discordie();
var creation_start = [];
var add_server = [];
 
client.connect({ token: "Mjc4MzkwMTc1ODAzODk5OTA0.C3roMw.Bx8YlafKr34xncXc-yYVPu6cAs0" });
 
client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});
 
client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if (e.message.content == "!init") {
		var user = client.Users.find(u => u.id == e.message.author.id);
		if (!user)
			return;
		for (var i = 0; i < creation_start.length; i++) {
			if (creation_start[i].id == user.id) {
				e.message.channel.sendMessage(e.message.author.mention + " has already begun character creation. Check your direct messages to continue the process.");
				return;
			}
		}
	  user.openDM().then(dm => dm.sendMessage("Welcome to character creation!", true));
	  user.openDM().then(dm => dm.sendMessage("You have been added to a character creation process.", true));
	  user.openDM().then(dm => dm.sendMessage("Rolling attributes for your character...", true));
	  var player_stats = statsRoll();
	  var stat_string = "";
	  for(var i = 0; i < player_stats.length; i++) {
		  stat_string += "\t" + player_stats[i] + "\n";
	  }
	  user.openDM().then(dm => dm.sendMessage("Your stats are: \n" + stat_string, true));
	  var new_player = new Player.constructor(user.username, user.id);
	  new_player.username = user.username;//kludge fix constructor later
	  new_player.id = user.id;
	  creation_start.push(new_player);
  }
});

function statsRoll() 
{
	var stats = [];
	for (var i = 0; i < 6; i++) {
		stats[i] = Dice.roll(4, 6, 3);
	}
	return stats;
}

/*client.Dispatcher.on(Events.VOICE_CHANNEL_JOIN, e => {
	var channelList = client.Channels.toArray();
	for(var i = 0; i < channelList.length; i++){
		if(channelList[i].name == "announcements")
			var channel = channelList[i];
	}
	if(channel != null){
		channel.sendMessage("User " + e.user.username + " has joined the " + e.channel.name + " channel", true);
	}
});*/

//client.Dispatcher.on(Events.VOICE_CHANNEL_JOIN, e => {
	//if(e.channel.name == "Timeout Room")
		
//});

/*client.Dispatcher.on(Events.PRESENCE_UPDATE, e => {
	if(e.user.gameName != e.user.previousGameName && e.user.gameName != null){
		var channelList = client.Channels.toArray();
		for(var i = 0; i < channelList.length; i++){
			if(channelList[i].name == "announcements"){
				var channel = channelList[i];
			}
		}
		if(channel != null){
			channel.sendMessage(e.user.username + " has begun playing " + e.user.gameName, true);
		}
	}else{
		var channelList = client.Channels.toArray();
		for(var i = 0; i < channelList.length; i++){
			if(channelList[i].name == "announcements"){
				var channel = channelList[i];
			}
		}
		if(channel != null){
			if(e.user.previousGameName != null){
				channel.sendMessage(e.user.username + " has stopped playing " + e.user.previousGameName, true);
			}
		}
	}
});*/
