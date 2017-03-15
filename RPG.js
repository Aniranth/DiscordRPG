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
		var new_player = new Player(user.username, user.id, player_stats, 0, player_stats);
		console.log("User: " + new_player.username + " Id: " + new_player.user_id + "\n");
		user.openDM().then(dm => dm.sendMessage("Your stats are: \n" + writeStats(new_player), true));
		creation_start.push(new_player);
		user.openDM().then(dm => dm.sendMessage("\nWhich of these stats would you like to assign to strength? (Direct message me the number preceding the stat)\n", true));
  	}
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	var player = null;
	var character_build;
	var user = client.Users.find(u => u.id == e.message.author.id);
	if(e.message.content != "!reassign" && e.message.content != "!confirm" && e.message.content != "!init" && e.message.author.username != "DMBot"){ //TODO: temp solution go off id
		if (e.message.isPrivate) {
			console.log(creation_start.length);
			for (var i = 0; i < creation_start.length; i++) {
				console.log("message id: " + user.id + " creation start: " + creation_start[i].user_id + " " +(user.id == creation_start[i].user_id));
				if (user.id == creation_start[i].user_id) {
					player = creation_start[i];
				}	
			}
			if(e.message.content.charAt(0) < '1' || e.message.content.charAt(0) > '6'){//TODO: error check message length
				user.openDM().then(dm => dm.sendMessage("Please insert a valid stat number. You are still assigning the stat as I previously stated.", true));
				return;
			}
			if(player.stat_array[e.message.content.charAt(0)-1] == "Already Assigned") {
				user.openDM().then(dm => dm.sendMessage("You have already assigned the stat in this slot. Please select a valid stat", true));
				return;
			}
			if(player){
				switch(player.current_stat_assign) {
					case 0: //Strength
						player.str_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.str_stat + " to your strength stat.\nWhich of these stats would you like to assign to dexterity? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = 1;
						break;
					case 1: //Dexterity
						player.dex_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.dex_stat + " to your dexterity stat.\nWhich of these stats would you like to assign to constitution? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = 2;
						break;
					case 2: //Constitution
						player.con_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.con_stat + " to your constitution stat.\nWhich of these stats would you like to assign to intelligence? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = 3;
						break;
					case 3: //Intelligence
						player.int_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.int_stat + " to your intelligence stat.\nWhich of these stats would you like to assign to wisdom? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = 4;
						break;
					case 4: //Wisdom
						player.wis_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.wis_stat + " to your wisdom stat.\nWhich of these stats would you like to assign to charisma? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = 5;
						break;
					case 5: //Charisma
						player.cha_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.cha_stat + " to your charisma stat You have finished assigning your stats. I will now prompt you for class and race(except I am not done yet)", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						player.current_stat_assign = "assignment_complete";
						break;
					default:
						user.openDM().then(dm => dm.sendMessage("\nOops something broke! I have removed you from the creation process. Please type \"!init\" again to reattempt.", true));
						return;
				}
			}
		}
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
		player.current_stat_assign = 0;
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
