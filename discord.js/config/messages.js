const colors = require('../../common/colors');

module.exports = {
	ready: colors.green + 'Ready: ' + colors.blue + 'Beep Bot' + colors.default + ' - fired up and ready to serve!',
	fox: [
		'Ring-ding-ding-ding-dingeringeding!',
		'Wa-pa-pa-pa-pa-pa-pow!',
		'Hatee-hatee-hatee-ho!',
		'Joff-tchoff-tchoffo-tchoffo-tchoff!',
		'Jacha-chacha-chacha-chow!',
		'Chacha-chacha-chacha-chow!',
		'Fraka-kaka-kaka-kaka-kow!',
		'A-hee-ahee ha-hee!',
		'A-oo-oo-oo-ooo!',
		'Woo-oo-oo-ooo!'
	],
	ninegag: [ 'Memes!', 'Dank!', 'Haha!', 'Not funny..' ],
	welcome: (member) => [
		`Hvem har lukket **${member.displayName}** ind?? Nå, hej!`,
		`When I say **${member.displayName}**, you say?`,
		`Er det et flyyyyy, nej det' **${member.displayName}** Stabil!`,
		`Wadu hek? **${member.displayName}** hek!`,
		`AND HIS NAME IS **JOHN ${member.displayName}**!`,
		`**${member.displayName}**? Det' ham der, der er på den båååd der!`
	],
	permission: {
		missing: 'You do not have permissions to do that'
	}
};
