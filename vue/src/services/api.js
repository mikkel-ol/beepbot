import Vue from 'vue';

const baseUrl = `${process.env.VUE_APP_API_HOST}`;

const urls = {
	sounds: `${baseUrl}/sounds`,
	servers: `${baseUrl}/servers`,
	voiceChannels: `${baseUrl}/soundboards/voicechannel`
};

const ApiService = {
	async getSounds() {
		return await Vue.axios.create({withCredentials: true}).get(urls.sounds);
	},

	async getServers() {
		return await Vue.axios.create({withCredentials: true}).get(urls.servers);
	},

	changeVoiceChannel(id) {
		Vue.axios.create({withCredentials: true}).put(urls.voiceChannels, {id: id});
	}
};

export default ApiService;
