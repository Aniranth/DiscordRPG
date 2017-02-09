var Discordie = require("discordie");
var Dice = require('./DiscordIF/dice');
var Player = require('./DiscordIF/player');
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
	  user.openDM().then(dm => dm.sendMessage("Select a class:\n\t1: Fighter\n\t2: Rogue\n\t3: Wizard\n\t4: Cleric\n\t5: Ranger\n\t6: Druid\nSelect a number to choose", true));
	  var new_player = new Player(user.username, user.id);
	  console.log("User: %s", new_player.username());
	  creation_start.push(new_player);
  }
});

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