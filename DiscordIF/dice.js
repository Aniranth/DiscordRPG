'use strict';

class Dice {	
	static roll(num, type)
	{
		let lowest = Number.MAX_VALUE;
		let total_roll = 0;
		for (let i = 0; i < num; i++) {
			let roll = Math.floor((Math.random()* type) + 1);
			total_roll += roll;
			if (roll <= lowest) {
				lowest = roll;
			}
		}
		total_roll -= lowest;
		return total_roll;
	}
}

module.exports = Dice;	