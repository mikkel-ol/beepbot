module.exports = (bot) => {
	// Create groups of commands
	bot.registry.registerGroups([
		[ 'random', 'Random' ],
		[ 'say', 'Say' ],
		[ 'control', 'Control' ],
		[ 'poll', 'Poll' ]
	]);

	// Where are my commands?!
	bot.registry.registerCommandsIn(__dirname);
	
	// When a user types !help all commands are returned
	bot.registry.registerDefaults();
};
