import Vue from 'vue';

const baseUrl = `${process.env.VUE_APP_API_HOST}`;

const urls = {
	sounds: `${baseUrl}/sounds`,
	servers: `${baseUrl}/servers`,
	user: `${baseUrl}/user`,
	voiceChannels: `${baseUrl}/soundboards/voicechannel`,
	playSound: `${baseUrl}/soundboards/play`,
	stopPlaying: `${baseUrl}/soundboards/stop`
};

const ApiService = {
	async getSounds() {
		return await Vue.axios.create({withCredentials: true}).get(urls.sounds);
	},

	async getServers() {
		return await Vue.axios.create({withCredentials: true}).get(urls.servers);
	},

	async getUser() {
		return await Vue.axios.create({withCredentials: true}).get(urls.user);
	},

	changeVoiceChannel(serverId, channelId) {
		Vue.axios.create({withCredentials: true}).put(urls.voiceChannels, {id: {server: serverId, channel: channelId} });
	},

	play(file) {
		// TODO: Handle "voice channel not selected"
		Vue.axios.create({withCredentials: true}).post(urls.playSound, {file: file});
	},

	stop() {
		Vue.axios.create({withCredentials: true}).post(urls.stopPlaying);
	}
};

export default ApiService;
