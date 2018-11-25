const { Client } = require('react-native-paho-mqtt');

const internals = {
    host: process.env.API_HOST || 'ws://iot.eclipse.org:80/ws',
    storage: {  //Set up an in-memory alternative to global localStorage
        setItem: (key, item) => {

            // TODO: this assumes key will never be one of these three functions (from example). Fix
            internals.storage[key] = item;
        },
        getItem: (key) => internals.storage[key],
        removeItem: (key) => {

            delete internals.storage[key];
        }
    }
};

// Create a client instance
const client = module.exports = new Client({
    uri: internals.host,
    clientId: 'kegbot',
    storage: internals.storage
});

// TODO: probably remove, move responsiblity to initializer
client.on('connectionLost', (responseObject) => {

    console.warn('connection lost mqtt client');
    if (responseObject.errorCode !== 0) {
        console.warn(responseObject.errorMessage);
    }
});
client.on('messageReceived', (message) => {

    console.warn('received: ' + message.payloadString);
});
