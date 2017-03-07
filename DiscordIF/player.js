'use strict';

function  Player(user_val, id_val, stat_arr_val, stat_assign_val) {
	console.log("Using DiscordIF player class\n");
	var username = user_val;
	var user_id = id_val;
	var str_stat = null;
	var dex_stat = null;
	var con_stat = null;
	var int_stat = null;
	var wis_stat = null;
	var cha_stat = null; 
	var stat_array = stat_arr_val;
	var current_stat_assign = stat_assign_val;
	
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
}

module.exports = Player;

