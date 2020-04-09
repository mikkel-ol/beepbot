# <img src="https://raw.githubusercontent.com/mikkel-ol/beepbot/master/assets/images/logo.png" alt="" width="24px" height="24px"> Beep Bot - *WIP*

A Discord bot with the following features:

* Soundboard
* Greetings - text and voice
* Dynamic change of voice channel names
* Dynamic change of bot status

<a href="https://discordapp.com/api/oauth2/authorize?client_id=352214774479847435&permissions=8&scope=bot">Add the bot to your server here!</a>

**For now the bot is getting full control of server. At a later time the correct permissions will be calculated**

### Administration

The bot is controlled on the website. An admin panel is accessible to the user which added the bot and from here the user can select roles and users which can administer the bot.

Users can upload a sound clip to be added to the soundboard which must then be approved by an admin. Furthermore they can upload a sound clip __directly__ as a voice greeting when they join a voice channel.

## Running it yourself

The following environment variables need to be set:

* `BEEPBOT_TOKEN` - [Discord bot token](link-to-discord-bot-page)

## Credits

The following libraries and technologies deserves mentioning:

<a href="https://discord.js.org"><img src="https://discord.js.org/favicon.ico" alt="" width="14px" height="14px"> Discord.js</a> - used to interact with the Discord API

<a href="https://vuejs.org"><img src="https://vuejs.org/images/icons/favicon-32x32.png" alt="" width="14px" height="14px"> Vue.js</a> - website framework

<a href="https://nodejs.org/"><img src="https://nodejs.org/static/images/favicons/favicon-32x32.png" alt="" width="14px" height="14px"> Node.js</a> - runtime of application
