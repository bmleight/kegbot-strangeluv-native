const KegbotTypes = require('action-types/kegbot');
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

exports.setMotors = (vx, vy) => ({
    type: KegbotTypes.SET_MOTORS,
    payload: {
        x: vx,
        y: vy
    }
});