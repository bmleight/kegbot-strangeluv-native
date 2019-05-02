const Connect = require('react-redux').connect;
const FaceHeader = require('components/FaceHeader');
const MqttActions = require('actions/mqtt');

const internals = {};

internals.connect = Connect(
    (state) => ({
        isConnected: state.mqtt.connected,
        connectionPending: state.mqtt.connectionPending,
        faces: state.kegbot.faces,
        battery: state.kegbot.battery,
        isPouring: state.kegbot.isPouring
    }),
    {
        connect: MqttActions.connect,
        disconnect: MqttActions.disconnect
    }
);

module.exports = internals.connect(FaceHeader);
