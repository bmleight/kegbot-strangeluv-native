const MqttTypes = require('../action-types/mqtt');
const Client = require('../utils/mqtt-client');

const internals = {};

const actions = exports;

exports.connected = () => ({
    type: MqttTypes.CONNECTED
});

exports.disconnected = () => ({
    type: MqttTypes.DISCONNECTED
});

exports.connect = () => {

    return (dispatch) => {

        Client
        .connect()
        .then(() => {

            dispatch(actions.connected());
        })
        .catch((responseObject) => {

            dispatch(actions.disconnected());
        });
    };
};

exports.disconnect = () => {

    return (dispatch) => {

        Client
        .disconnect()
        .then(() => {

            dispatch(actions.disconnected());
        });
    };
};
