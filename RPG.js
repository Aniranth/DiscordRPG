var Discordie = require("discordie");
const Dice = require("./DiscordIF/dice.js");
var Player = require("./DiscordIF/player.js");
var Events = Discordie.Events;

var client = new Discordie();
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
		user.openDM().then(dm => dm.sendMessage("Welcome to character creation!", true));
		user.openDM().then(dm => dm.sendMessage("You have been added to a character creation process.", true));
		user.openDM().then(dm => dm.sendMessage("Rolling attributes for your character...", true));
		var player_stats = statsRoll();
		var new_player = new Player(user.username, user.id, player_stats, 420);//TODO: Fix class getter and setter functions. Learn js syntax
		console.log("User: " + new_player.username + " Id: " + new_player.user_id + "\n");
		var stat_string = "";
		for(var i = 0; i < new_player.stat_array.length; i++) {
			stat_string += "\t" + (i + 1) + ". " + new_player.stat_array[i] + "\n";
		}
		user.openDM().then(dm => dm.sendMessage("Your stats are: \n" + stat_string, true));
		creation_start.push(new_player);
		user.openDM().then(dm => dm.sendMessage("\nWhich of these stats would you like to assign to strength? (Direct message me the number preceding the stat or the stat itself)\n", true));
  	}
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	var player = null;
	var character_build;
	var user = client.Users.find(u => u.id == e.message.author.id);
	if(e.message.content != "!init" && e.message.author.username != "DMBot"){ //TODO: temp solution go off id
		for(var i = 0; i < creation_start.length; i++) {
			console.log(creation_start[i].username + " statthing: " + creation_start[i].current_stat_assign + "\n");
		}
		if (e.message.isPrivate) {
			for (var i = 0; i < creation_start.length; i++) {
				if (user.id == creation_start[i].user_id) {
					player = creation_start[i];
				} else {
					return;
				}	
			}
			switch(player.current_stat_assign) {
				case 0: //Strength
					break;
				case 1: //Dexterity
					break;
				case 2: //Constitution
					break;
				case 3: //Intelligence
					break;
				case 4: //Wisdom
					break;
				case 5: //Charisma
					break;
				default:
					user.openDM().then(dm => dm.sendMessage("\nOops something broke! I have removed you from the creation process. Please type \"!init\" again to reattempt.", true));
					return;
			}
		}
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
