const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../express/dist'),
	devServer: {
		proxy: {
			'/auth': {
				target: 'http://localhost:8080',
				secure: false,
				ws: false
			}
		}
	}
};
