const path = require('path');

const activities = require(path.join(global.discordRoot, '/config/activities'));
const intervals = require(path.join(global.discordRoot, '/config/intervals')).activity;

function set(bot) {
    // Get random activity
    const i = Math.floor(Math.random() * activities.length);
    const activity = activities[i];

    bot.user
        .setActivity(activity.status, activity.options)
        .then((presence) => global.logger.success(`Changed activity to: ${activity.options.type} ${activity.status}`))
        .catch(console.error);
}

class ActivityLoop {
    constructor(bot) {
        this.bot = bot;
    }

    run() {
        const span = intervals.max - intervals.min;
        const delay = Math.round(Math.random() * span) + intervals.min;

        setTimeout(() => {
            set(this.bot);
            this.run(this.bot);
        }, delay);
    }
}

module.exports = ActivityLoop;
