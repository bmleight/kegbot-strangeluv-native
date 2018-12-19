const { Message } = require('react-native-paho-mqtt');
const Client = require('../utils/mqtt-client');

const internals = {};

exports.drive = (direction, data) => {

    return (dispatch) => {

        const message = new Message('kegbot');
        message.destinationName = direction;
        console.warn(data);
        Client.send(message, data);
    };
};
