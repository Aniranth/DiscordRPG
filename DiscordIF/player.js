'use strict';

class Player {
	constructor(user_name, player_id)
	{
		this.username = user_name;
		this.id = player_id;
		this.race = "";
		this.player_class = "";
		this.str_stat = 0;
		this.int_stat = 0;
		this.wis_stat = 0;
		this.dex_stat = 0;
		this.con_stat = 0;
		this.cha_stat = 0;
	}
	
	get username()
	{
		return this.username;
	}
	
	get id()
	{
		return this.id;
	}
	
	set str_stat(strength) 
	{
		this.str_stat = strength;
	}
	
	get str_stat()
	{
		return this.str_stat;
	}

	set int_stat(intelligence) 
	{
		this.int_stat = intelligence;
	}
	
	get int_stat()
	{
		return this.int_stat;
	}

	set wis_stat(wisdom)
	{
		this.wis_stat = wisdom;
	}
	
	get wis_stat()
	{
		return this.wis_stat;
	}
	
	set dex_stat(dexterity)
	{
		this.dex_stat = dexterity;
	}
	
	get dex_stat() 
	{
		return this.dex_stat;
	}
	
	set con_stat(constitution)
	{
		this.con_stat = constitution;
	}
	
	get con_stat() 
	{
		return this.con_stat;
	}	
	
	set cha_stat(charisma) 
	{
		this.cha_stat = charisma;
	}
	
	get cha_stat()
	{
		return this.cha_stat;
	}
	
	set player_class(user_class)
	{
		this.player_class = user_class;
	}
	
	get player_class()
	{
		return this.player_class;
	}
	
	set race(race)
	{
		this.race = race;
	}
	
	get race()
	{
		return this.race;
	}
}

module.exports = Player;

