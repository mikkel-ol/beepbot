const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../express/dist'),
	devServer: {
		proxy: {
			'/auth': {
				target: 'http://localhost',
				secure: false,
				ws: false
			}
		}
	}
};
