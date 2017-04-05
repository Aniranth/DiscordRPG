'use strict';

function  Player(user_val, id_val, stat_arr_val, stat_assign_val, back_assign_val) {
	var username = user_val;
	var user_id = id_val;
	var str_stat = null;
	var dex_stat = null;
	var con_stat = null;
	var int_stat = null;
	var wis_stat = null;
	var cha_stat = null; 
	var player_class = null;
	var player_race = null;
	var stat_array = stat_arr_val;
	var current_stat_assign = stat_assign_val;
	var back_stat_array = back_assign_val;
	var stats_to_assign = ["str", "dex", "con", "int", "wis", "cha"];
	
	Object.defineProperty(this, 'username', {
		get: function() {
			return username;
		},
		set: function(name_val) {
			username = name_val;
		}
	});
	
	Object.defineProperty(this, 'user_id', {
		get: function() {
			return user_id;
		},
		set: function(id_val) {
			user_id = id_val;
		}
	});

	Object.defineProperty(this, 'str_stat', {
		get: function() {
			return str_stat;
		},
		set: function(str_val) {
			str_stat = str_val;
		}
	});

	Object.defineProperty(this, 'dex_stat', {
		get: function() {
			return dex_stat;
		},
		set: function(dex_val) {
			dex_stat = dex_val;
		}
	});

	Object.defineProperty(this, 'con_stat', {
		get: function() {
			return con_stat;
		},
		set: function(con_val) {
			con_stat = con_val;
		}
	});

	Object.defineProperty(this, 'int_stat', {
		get: function() {
			return int_stat;
		},
		set: function(int_val) {
			int_stat = int_val;
		}
	});

	Object.defineProperty(this, 'wis_stat', {
		get: function() {
			return wis_stat;
		},
		set: function(wis_val) {
			wis_stat = wis_val;
		}
	});

	Object.defineProperty(this, 'cha_stat', {
		get: function() {
			return cha_stat;
		},
		set: function(cha_val) {
			cha_stat = cha_val;
		}
	});

	Object.defineProperty(this, 'player_class', {
		get: function() {
			return player_class;
		},
		set: function(class_val) {
			player_class = class_val;
		}
	});

	Object.defineProperty(this, 'player_race', {
		get: function() {
			return player_race;
		},
		set: function(race_val) {
			player_race = race_val;
		}
	});
	
	Object.defineProperty(this, 'stat_array', {
		get: function() {
			return stat_array;
		},
		set: function(stat_array_val) {
			stat_array = stat_array_val;
		}
	});
	
	Object.defineProperty(this, 'current_stat_assign', {
		get: function() {
			return current_stat_assign;
		},
		set: function(current_stat_assign_val) {
			current_stat_assign = current_stat_assign_val;
		}
	});

	Object.defineProperty(this, 'back_stat_array', {
		get: function() {
			return back_stat_array;
		},
		set: function(back_stat_assign_val) {
			back_stat_array = back_stat_assign_val;
		}
	});
	
	Object.defineProperty(this, 'stats_to_assign', {
		get: function() {
			return stats_to_assign;
		},
		set: function(stats_to_assign_val) {
			stats_to_assign = stats_to_assign_val;
		},
		reset_array: function(){
			stats_to_assign = ["str", "dex", "con", "int", "wis", "cha"];
		}
	});
}

module.exports = Player;

