const 
	interval = require('../config/intervals').activity,
	types = require('../config/activities');

function set(bot) {
	// Get random activity
	const i = Math.floor(Math.random() * types.length);
	activity = types[i]; 

	bot.user.setActivity(activity.status, activity.options) // Set it
		.then(presence => { console.log(`Changed my activity to: ${activity.options.type} ${activity.status}`) } )
		.catch(console.error);
}

function loop(bot) {
	const span = interval.max - interval.min;
	const delay = Math.round(Math.random() * span) + interval.min;

	setTimeout( () => {
		set(bot);
		loop(bot); // Calls itself when done (doesn't stack up)
	}, delay);
}

module.exports = (bot) => {
	loop(bot);
}
