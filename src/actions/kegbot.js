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

exports.setPower = (power) => ({
    type: KegbotTypes.SET_POWER,
    payload: {
        power
    }
});

exports.setBattery = (volts) => ({
    type: KegbotTypes.SET_BATTERY,
    payload: {
        volts
    }
});

exports.foundFace = (faces) => ({
    type: KegbotTypes.FOUND_FACE,
    payload: {
        faces
    }
});

exports.startPouring = () => ({
    type: KegbotTypes.POUR_START
});

exports.endPouring = () => ({
    type: KegbotTypes.POUR_END
});

exports.lightsOff = (direction, data = {}) => {

    return (dispatch) => {

        const message = new Message('{L1:0,L2:0,L3:0,L4:0,L5:0,L6:0}');
        message.destinationName = 'mkl.lytebulb';

        Client.send(message);
    };
};

exports.lightsOn = (direction, data = {}) => {

    return (dispatch) => {

        const message = new Message('{L1:1,L2:1,L3:1,L4:1,L5:1,L6:1}');
        message.destinationName = 'mkl.lytebulb';

        Client.send(message);
    };
};
