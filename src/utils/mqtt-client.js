const { Client } = require('react-native-paho-mqtt');

const internals = {
    // host: process.env.API_HOST || 'ws://192.168.86.37:9001/ws',
    // host: process.env.API_HOST || 'ws://127.0.0.1:9001/ws',
    host: process.env.API_HOST || 'ws://192.168.2.128:9001/ws',
    storage: {  //Set up an in-memory alternative to global localStorage
        setItem: (key, item) => {

            internals.storage.items[key] = item;
        },
        getItem: (key) => internals.storage.items[key],
        removeItem: (key) => {

            delete internals.storage.items[key];
        },
        items: {}
    }
};

module.exports = new Client({
    uri: internals.host,
    clientId: 'kegbot',
    storage: internals.storage
});
