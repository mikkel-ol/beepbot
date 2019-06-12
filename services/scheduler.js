const scheduler = require('node-schedule');

// Tell 'em it's 420
// schedule.scheduleJob('20 16,4 * * *', () => {
// 	fourtwenty.tell(voiceChannel1);
// });

// TODO: Fix time setting
module.exports = (time, callback) => {
	scheduler.scheduleJob(time, () => {
		callback();
	})
}