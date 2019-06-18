import axios from 'axios';

const baseUrl = `${process.env.VUE_APP_API_HOST}`;

const urls = {
	sounds: `${baseUrl}/sounds`,
	servers: `${baseUrl}/servers`
};

const ApiService = {
	async getSounds() {
		return await axios.get(urls.sounds);
	},

	async getServers() {
		return await axios.get(urls.servers);
	}
};

export default ApiService;
