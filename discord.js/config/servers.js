const path = require('path');

const 
    mongo = require('mongodb').MongoClient,
    settings = require(path.join(global.discordRoot, '/config/database')),
    url = settings.url,
    name = settings.name,
    collectionName = 'servers';

function add(server) {
    // TODO: Error checking

    let collection;

    mongo.connect(url, (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        
        const db = client.db(name);
        collection = db.collection(collectionName);
    })

    collection.insertOne({id: server.id, roles: server.roles}, (err, result) => {});
}

function remove(server) {
    // TODO: Error checking

    map.delete(server.id);
}

function get(id) {
    let collection;

    mongo.connect(url, (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        
        const db = client.db(name);
        collection = db.collection(collection);
    })

    collection.findOne({id: id}, (err, item) => {
        if (err) {
            console.error(err);
            return;
        }

        return item;
    });
}

module.exports = {
    add,
    remove,
    get
}