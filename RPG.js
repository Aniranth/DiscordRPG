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
		user.openDM().then(dm => dm.sendMessage("Welcome to character creation this is a test!", true)).then(e => {
			new_player.message_to_player = e.id;
			console.log("Message ID: " + new_player.message_to_player);
			console.log("User: " + new_player.username + " Id: " + new_player.user_id);// note to self put code dependent to an async call in the then success
			creation_start.push(new_player, user);
			emitter.emit("UPDATE_MESSAGE", new_player);		
		});//TODO: add failure resolution
		//fetchMessages(1, new_player.message_to_player).then(e => );//TODO: This might be bad to do test this
  	}
});

emitter.on("UPDATE_MESSAGE", (plyr) => {
	var user = client.Users.find(u => u.id == plyr.user_id);
	if (!user)
		return;
	console.log("got here");//TODO: figure out why it gets an old message
	user.openDM().then(dm => (dm.fetchMessages(1, plyr.message_to_player))).then(e => {console.log(e.messages[0].content); e.messages[0].addReaction("\uD83D\uDE2C")});
});

//This is now obsolete
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
			if(player.current_stat_assign != "class_assign" && player.current_stat_assign != "race_assign" && player.stat_array[e.message.content.charAt(0)-1] == "Already Assigned") {
				user.openDM().then(dm => dm.sendMessage("You have already assigned the stat in this slot. Please select a valid stat", true));
				return;
			}
			if(player){
				switch(player.current_stat_assign) {
					case "str_stat": //Strength
						player.str_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.str_stat + " to your strength stat.\nWhich of these stats would you like to assign to dexterity? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = "dex_stat";
						break;
					case "dex_stat": //Dexterity
						player.dex_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.dex_stat + " to your dexterity stat.\nWhich of these stats would you like to assign to constitution? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = "con_stat";
						break;
					case "con_stat": //Constitution
						player.con_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.con_stat + " to your constitution stat.\nWhich of these stats would you like to assign to intelligence? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = "int_stat";
						break;
					case "int_stat": //Intelligence
						player.int_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.int_stat + " to your intelligence stat.\nWhich of these stats would you like to assign to wisdom? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = "wis_stat";
						break;
					case "wis_stat": //Wisdom
						player.wis_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.wis_stat + " to your wisdom stat.\nWhich of these stats would you like to assign to charisma? (Direct message me the number preceding the stat)\n", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Your stats are:\n" + writeStats(player), true));
						player.current_stat_assign = "cha_stat";
						break;
					case "cha_stat": //Charisma
						player.cha_stat = player.stat_array[e.message.content.charAt(0)-1];
						user.openDM().then(dm => dm.sendMessage("You have assigned: " + player.cha_stat + " to your charisma stat You have finished assigning your stats. I will now prompt you for class and race(except I am not done yet)", true));
						player.stat_array[e.message.content.charAt(0)-1] = "Already Assigned";
						//TODO: prevent stats from being assigned twice
						user.openDM().then(dm => dm.sendMessage("Select a class from the list below. (Direct message me the number preceding the class)\n\t1. Fighter", true));//TODO: Make this a part of the last DM to not flood user
						player.current_stat_assign = "class_assign";
						break;
					case "class_assign":
						var class_val = e.message.content.charAt(0);
						switch (class_val) {
							case "1": // Fighter
								user.openDM().then(dm => dm.sendMessage("You have selected the fighter class.\nSelect a race from the following list. (Direct message me the number preceding the race)\n\t1. Human", true));
								player.player_class = "fighter";
								var guild = client.Guilds.find(g => g.name == "Delirium"); // How to assign roles
								var role = guild.roles.find(r => r.name == "Fighter");
								var member = user.memberOf(guild);
								var member_nickname_string;
								if(member.nick != null) {
									member_nickname_string = member.nick + "  LVL. 1"; // string parse so that name cannot be set to "Aniranth LVL. 1 LVL. 2"
								} else {
									member_nickname_string = user.username + "  LVL. 1";
								}
								console.log("Debug: "  + member_nickname_string);
								member.setNickname(member_nickname_string);
								member.assignRole(role);
								player.current_stat_assign = "race_assign";
								break;
							default:
								console.log("You broke it again!");
						}
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