const path = require('path');

const mongo = require('mongodb').MongoClient,
	settings = require(path.join(global.discordRoot, '/config/database')),
	url = settings.url,
	name = settings.name,
	collectionName = 'servers';

class Servers {
	async connect() {
		return new Promise((resolve, reject) => {
			mongo.connect(url, { useNewUrlParser: true }, (error, client) => {
				if (error) return reject(error);

				this.collection = client.db(name).collection(collectionName);
				return resolve();
			});
		});
	}

	async add(server) {
		// TODO: Error checking

		if (!this.collection) await this.connect();
		await this.collection.updateOne( {_id: server.id } , { $set: {_id: server.id, roles: server.roles} } , { upsert: true });
	}

	async remove(server) {
		// TODO: Error checking

		if (!this.collection) await this.connect();
		await this.collection.deleteOne({ _id: server.id });
	}

	async get(id) {
		// TODO: Error checking

        if (!this.collection) await this.connect();
        return await this.collection.findOne({ _id: id});
	}

	async drop() {
		if (!this.collection) await this.connect();
		await this.collection.drop();
	}
}

module.exports = {
	Servers
};
