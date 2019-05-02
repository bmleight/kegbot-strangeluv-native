const MqttTypes = require('../action-types/mqtt');
const Client = require('../utils/mqtt-client');

const internals = {};

const actions = exports;

exports.connectStart = () => ({
    type: MqttTypes.CONNECT_START
});

exports.connectSuccess = () => ({
    type: MqttTypes.CONNECT_SUCCESS
});

exports.connectFail = () => ({
    type: MqttTypes.CONNECT_FAILURE
});

exports.disconnectStart = () => ({
    type: MqttTypes.DISCONNECT_START
});

exports.disconnectSuccess = () => ({
    type: MqttTypes.DISCONNECT_SUCCESS
});

exports.disconnectFail = () => ({
    type: MqttTypes.DISCONNECT_FAILURE
});

exports.connect = () => {

    return (dispatch) => {

        dispatch(actions.connectStart());

        Client
        .connect()
        .then(() => {

            // Client.subscribe('hackbot/*');  // TODO: does this work?
            Client.subscribe('hackbot/status');
            Client.subscribe('hackbot/faces');
            Client.subscribe('hackbot/flow-start');
            Client.subscribe('hackbot/flow-end');
            dispatch(actions.connectSuccess());
        })
        .catch((responseObject) => {

            dispatch(actions.connectFail());
        });
    };
};

exports.disconnect = () => {

    return (dispatch) => {

        dispatch(actions.disconnectStart());

        Client
        .disconnect()
        .catch((responseObject) => {

            dispatch(actions.disconnectFail());
        });
    };
};
