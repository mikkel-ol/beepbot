const events = [
    require('./handlers/guildMemberAdd'),
    require('./handlers/message'),
    require('./handlers/ready'),
    require('./handlers/voiceStateUpdate')
]

module.exports = (bot) => {
    events.forEach(element => {
        element(bot);
    });
}