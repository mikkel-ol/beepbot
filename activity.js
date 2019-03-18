const 	{ 	ACTIVITY_CHANGE_MIN,
			ACTIVITY_CHANGE_MAX,
			ACTIVITY_TYPES } 		= require('./config'); // Get activity array and interval;



function setActivity(bot) {
	activity = ACTIVITY_TYPES[Math.floor(Math.random()*ACTIVITY_TYPES.length)]; // Get random activity
	bot.user.setActivity(activity.status, activity.options) // Set it
		.then(presence => { console.log(`Changed my activity to: ${activity.options.type} ${activity.status}`) } )
		.catch(console.error);
}

function loop(bot) {
	delay = Math.round(Math.random() * (ACTIVITY_CHANGE_MAX - ACTIVITY_CHANGE_MIN)) + ACTIVITY_CHANGE_MIN; // Get random delay between interval
	setTimeout(function() {
		setActivity(bot);
		loop(bot); // Calls itself when done (doesn't stack up)
	}, delay);
}

module.exports = { loop };
