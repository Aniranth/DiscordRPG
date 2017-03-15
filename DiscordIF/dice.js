'use strict';

class Dice {	
	static roll(num, type, num_keep)
	{
		let PriorityQueue = require('priorityqueuejs');
		let keep = new PriorityQueue(function (a, b) {
			return a-b;
		});

		for (let i = 0; i < num; i++) {
			let roll = Math.floor((Math.random()* type) + 1);
			keep.enq(roll);
		}
		let total_roll = 0;
		for (let i = 0; i < num_keep; i++) {
			total_roll += keep.deq();
		}
		return total_roll;
	}
}

module.exports = Dice;

