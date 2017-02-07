var Discordie = require("discordie");
var Events = Discordie.Events;
 
var client = new Discordie();
 
client.connect({ token: "" });
 
client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});
 
client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if (e.message.content == "!init") {
	  var user = client.Users.find(u => u.username == e.message.author.username);
	  if(!user)
			return;
	  user.openDM().then(dm => dm.sendMessage("Welcome to character creation!", true));
  }
});

client.Dispatcher.on(Events.VOICE_CHANNEL_JOIN, e => {
	var channelList = client.Channels.toArray();
	for(var i = 0; i < channelList.length; i++){
		if(channelList[i].name == "announcements")
			var channel = channelList[i];
	}
	if(channel != null){
		channel.sendMessage("User " + e.user.username + " has joined the " + e.channel.name + " channel", true);
	}
});

//client.Dispatcher.on(Events.VOICE_CHANNEL_JOIN, e => {
	//if(e.channel.name == "Timeout Room")
		
//});

client.Dispatcher.on(Events.PRESENCE_UPDATE, e => {
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
});