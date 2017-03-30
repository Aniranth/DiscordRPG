'use strict';

class MessageConstructor {	
	static buildMessage(stat, player)
	{
		var ability_modifier = Math.floor((stat - 10)/2);
		//Write custom post for discord
		var string_post = "";
		string_post += "You rolled the stat " + stat + " this roll corresponds to an ability modifier of " 
			+ ability_modifier + "\nClick on the reaction that corresponds to the stats found below.\n\n";
		for (var i = 0; i < player.stats_to_assign.length; i++) {
			switch(player.stats_to_assign[i]) {
				case "str":
					string_post += ":one:: Strength\n"
					switch(ability_modifier) {
						case -4:
							string_post += "With a -4 in strength you have the incredible ability to carry at most 30 pounds of gear. You are the embodiement of flesh and bones.\n\n"
							break;
						case -3:
							string_post += "With a -3 in strength you are very weak. Perhaps not flesh and bones but you are still not going to win any fist fights.\n\n"
							break;
						case -2:
							string_post += "With a -2 in strength you are very weak. You do not take much of an interest in physical strength. That being said you are not of the lowest stature in strength.\n\n"
							break;
						case -1:
							string_post += "With a -1 in strength you are slightly below average. With a bit of work perhaps you could get to the stature of average.\n\n"
							break;
						case 0:
							string_post += "With a +0 in strength you are average in your physical strength. You are not particularly strong but you are not weak either.\n\n"
							break;
						case 1:
							string_post += "With a +1 in strength you are a a bit strong. You are incapable of taking on the absolute strongest in a fist fight but you are certainly stronger than the average person.\n\n"
							break;
						case 2:
							string_post += "With a +2 in strength you are moderately strong. Impressive to the laymen(in terms of strength of course) you impress all those weaker than you with mildly impressive feats of strength.\n\n"
							break;
						case 3:
							string_post += "With a +3 in strength you are quite strong. An asset to your entire team in the brawn department just make sure to keep yourself fit.\n\n"
							break;
						case 4:
							string_post += "With a +4 in strength you are incredibly strong. Go find the nearest fight club and sign yourself up there is money to be had.\n\n"
							break;
						default:
							console.log("This shouldn't be possible. Stat: " + stat);
							break;
					}
					break;
				case "dex":
					string_post += ":two:: Dexterity\n"
					switch(ability_modifier) {
						case -4:
							string_post += "With a -4 in dexterity you are incredibly clumsy. Be careful when you stand up or sit down or move or do any normal human action that requires the slightest ability.\n\n"
							break;
						case -3:
							break;
						case -2:
							break;
						case -1:
							break;
						case 0:
							break;
						case 1:
							break;
						case 2:
							break;
						case 3:
							break;
						case 4:
							break;
						default:
							console.log("This shouldn't be possible. Stat: " + stat);
							break;
					}
					break;
				case "con":
					switch(ability_modifier) {
						case -4:
							break;
						case -3:
							break;
						case -2:
							break;
						case -1:
							break;
						case 0:
							break;
						case 1:
							break;
						case 2:
							break;
						case 3:
							break;
						case 4:
							break;
						default:
							console.log("This shouldn't be possible. Stat: " + stat);
							break;
					}
					break;
				case "int":
					switch(ability_modifier) {
						case -4:
							string_post += "With a -4 in intelligence you are incredibly inept. I shouldn't even bother telling you anything as you couldn't read it anyways.\n\n"
							break;
						case -3:
							break;
						case -2:
							break;
						case -1:
							break;
						case 0:
							break;
						case 1:
							break;
						case 2:
							break;
						case 3:
							break;
						case 4:
							break;
						default:
							console.log("This shouldn't be possible. Stat: " + stat);
							break;
					}
					break;
				case "wis":
					switch(ability_modifier) {
						case -4:
							break;
						case -3:
							break;
						case -2:
							break;
						case -1:
							break;
						case 0:
							break;
						case 1:
							break;
						case 2:
							break;
						case 3:
							break;
						case 4:
							break;
						default:
							console.log("This shouldn't be possible. Stat: " + stat);
							break;
					}
					break;
				case "cha":
					switch(ability_modifier) {
						case -4:
							break;
						case -3:
							break;
						case -2:
							break;
						case -1:
							break;
						case 0:
							break;
						case 1:
							break;
						case 2:
							break;
						case 3:
							break;
						case 4:
							break;
						default:
							console.log("This shouldn't be possible. Stat: " + stat);
							break;
					}
					break;
				default:
					console.log("got to default state fix stat stuff");
					break;
			}
		}
	}
}

module.exports = MessageConstructor;