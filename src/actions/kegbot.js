const { Message } = require('react-native-paho-mqtt');
const Client = require('../utils/mqtt-client');

const internals = {};

exports.drive = (direction) => {

    return (dispatch) => {

        try {
            const message = new Message(direction);
            message.destinationName = 'kegbot';
            Client.send(message);
        }
        catch (exception) {
            // TODO: make sure we are graceful when the message fails, sometimes due to being disconnected
            console.warn('catch in kegbot action', exception);
        }
    };
};
