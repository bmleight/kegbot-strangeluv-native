const { Message } = require('react-native-paho-mqtt');
const Client = require('../utils/mqtt-client');

const internals = {};

exports.drive = (direction) => {

    return (dispatch) => {

        const message = new Message('kegbot');
        message.destinationName = direction;
        Client.send(message);
    };
};
