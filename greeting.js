const {	MIKKEL_ID,
		FISCHER_ID,
		SIMON_ID,
		LK_ID,
		KIM_ID,
		HOLK_ID,
		NAGY_ID,
	 	DEFAULT_VOLUME }	= require('./config');

function newMember(member) {
	const	welcome1 = `Hvem har lukket **${member.displayName}** ind?? Nå, hej!`,
			welcome2 = `When I say **${member.displayName}**, you say?`,
			welcome3 = `Er det et flyyyyy, nej det' **${member.displayName}** Stabil!`,
			welcome4 = `Wadu hek? **${member.displayName}** hek!`,
			welcome5 = `AND HIS NAME IS **JOHN ${member.displayName}**!`,
			welcome6 = `**${member.displayName}**? Det' ham der, der er på den båååd der!`,
			welcomes = [welcome1, welcome2, welcome3, welcome4, welcome5],
			message  = welcomes[Math.floor(Math.random()*welcomes.length)];

	if (!member.guild.available) return console.error(`ERROR: Cannot greet new member on guild \"${member.guild.name}\". Guild unavailable`);
	else member.guild.channels.filter(channel => channel.type == "text").first().send(message); // Send greeting to first text channel in guild
}

function voiceJoin(newMember) {
	let song;

  	switch (Number(newMember.id)) {
  		case FISCHER_ID:
  			const { FISCHER_SONGS } = require('./config');
  			song = FISCHER_SONGS[Math.floor(Math.random() * FISCHER_SONGS.length)];
  			break;

  		case MIKKEL_ID:
  			const { MIKKEL_SONGS } = require('./config');
  			song = MIKKEL_SONGS[Math.floor(Math.random() * MIKKEL_SONGS.length)];
  			break;

  		case SIMON_ID:
  			const { SIMON_SONGS } = require('./config');
  			song = SIMON_SONGS[Math.floor(Math.random() * SIMON_SONGS.length)];
  			break;

  		case LK_ID:
  			const { LK_SONGS } = require('./config');
  			song = LK_SONGS[Math.floor(Math.random() * LK_SONGS.length)];
  			break;

  		case HOLK_ID:
  			const { HOLK_SONGS } = require('./config');
  			song = HOLK_SONGS[Math.floor(Math.random() * HOLK_SONGS.length)];
  			break;

  		case NAGY_ID:
  			const { NAGY_SONGS } = require('./config');
  			song = NAGY_SONGS[Math.floor(Math.random() * NAGY_SONGS.length)];
  			break;

  		case KIM_ID:
  			const { KIM_SONGS } = require('./config');
  			song = KIM_SONGS[Math.floor(Math.random() * KIM_SONGS.length)];
  			break;

  		default:
  			return;
  	}

  	newMember.setMute(true)

  	newMember.voiceChannel.join()
	  	.then(connection => {
	  		const dispatcher = connection.playFile(song);
	  		dispatcher.setVolumeLogarithmic(DEFAULT_VOLUME);

	        dispatcher.on('end', reason => setTimeout(function() { // Stupid 'end' bug
	        	newMember.setMute(false);
	        }), 500);
	    })
	  	.catch(console.log);
}

module.exports = {
	newMember,
	voiceJoin
}
