var Discordie = require("discordie");//change block stuff to consts
const Dice = require("./DiscordIF/dice.js");
var Player = require("./DiscordIF/player.js");
var EventEmitter = require("events");
var Events = Discordie.Events;

var client = new Discordie();
const emitter = new EventEmitter(); 
var creation_start = [];
var add_server = [];
 
client.connect({ token: "Mjc4MzkwMTc1ODAzODk5OTA0.C3roMw.Bx8YlafKr34xncXc-yYVPu6cAs0" });

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});
 
client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	if (e.message.content == "!init" && e.message.author.username != "DMBot") {
		var user = client.Users.find(u => u.id == e.message.author.id);
		if (!user)
			return;
		for (var i = 0; i < creation_start.length; i++) {
			if (creation_start[i].user_id == user.id) {
				e.message.channel.sendMessage(e.message.author.mention + " has already begun character creation. Check your direct messages to continue the process.");
				return;
			}
		}
		
		var player_stats = statsRoll();
		var i = player_stats.length;
		var temp = new Array();
		while (i--) temp[i] = player_stats[i];
		var new_player = new Player(user.username, user.id, player_stats, "str_stat", temp);
		creation_start.push(new_player, user);
		user.openDM().then(dm => dm.sendMessage("Welcome to character creation this is a test!", true)).then(e => {
			new_player.message_to_player = e.id;
			console.log("Message ID: " + new_player.message_to_player);
			console.log("User: " + new_player.username + " Id: " + new_player.user_id);// note to self put code dependent to an async call in the then success
			//creation_start.push(new_player, user);
			//emitter.emit("UPDATE_MESSAGE", new_player);		
		});//TODO: add failure resolution
		//fetchMessages(1, new_player.message_to_player).then(e => );//TODO: This might be bad to do test this
  	}
});

//This is now obsolete
client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	if(e.message.author.username == "DMBot") {
		console.log("got here");
		var user = null;
		for(var i = 0; i < creation_start.length; i++) {
			if(creation_start[i].message_to_player == e.message.id) {
				user = creation_start[i];	
			}
		}
		if(user == null) {
			console.log("How did it get here?");
			return;
		}
		e.message.addReaction("\uD83D\uDE2C");
		e.message.edit(writeStats(user));
	}
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	if(e.message.content == "!reassign"){
		var user = client.Users.find(u => u.id == e.message.author.id);
		var player = null;
		if(!user){
			return;
		}
		for (var i = 0; i < creation_start.length; i++) {
			if(creation_start[i].user_id == user.id) {
				player = creation_start[i];
			}
		}
		for(var i = 0; i < player.stat_array.length; i++) {
			console.log(i + ": stat arr: " + player.stat_array[i] + " back arr: " + player.back_stat_array[i] + "\n");
			player.stat_array[i] = player.back_stat_array[i]; //revert player
		}
		player.current_stat_assign = "str_stat";
		user.openDM().then(dm => dm.sendMessage("You have restarted stat assignment\nYour stats are: \n" + writeStats(player) + "\nWhich of these stats would you like to assign to strength? (Direct message me the number preceding the stat)\n", true));
	} else if (e.message.content == "!confirm") {
		console.log("Uploading to database");	
	}	
});

function statsRoll() 
{
	var stats = [];
	var mod = 0;
	for (var i = 0; i < 6; i++) {
		stats[i] = Dice.roll(4, 6, 3);
		mod += Math.floor(((stats[i] - 10)/2));
	}
	if (mod > 8 || mod < 4) {
		return statsRoll();
	} else {
		return stats;
	}
}

function writeStats(player) 
{
	var stat_string = "";
	for(var i = 0; i < player.stat_array.length; i++) {
		stat_string += "\t" + (i + 1) + ". " + player.stat_array[i] + "\n";
	}
	return stat_string;
}