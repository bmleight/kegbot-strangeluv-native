const { Message } = require('react-native-paho-mqtt');
const Client = require('../utils/mqtt-client');

const internals = {};

exports.drive = (direction, data = {}) => {

    return (dispatch) => {

        const message = new Message(JSON.stringify(data));
        message.destinationName = direction;

        Client.send(message);
    };
};
