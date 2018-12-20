const { Message } = require('react-native-paho-mqtt');
const Client = require('../utils/mqtt-client');

const internals = {};

exports.drive = (direction, data = '') => {

    return (dispatch) => {

        // if (typeof data === 'undefined') {
        //     data = '';
        // }

        const message = new Message(data);
        message.destinationName = direction;

        Client.send(message);
    };
};
