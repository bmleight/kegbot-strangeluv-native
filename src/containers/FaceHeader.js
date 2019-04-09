const Connect = require('react-redux').connect;
const FaceHeader = require('components/FaceHeader');
const MqttActions = require('actions/mqtt');

const internals = {};

internals.connect = Connect(
    (state) => ({
        isConnected: state.mqtt.connected,
        hasFace: state.kegbot.faces !== null,
        battery: state.kegbot.battery
    }),
    {
        connect: MqttActions.connect,
        disconnect: MqttActions.disconnect
    }
);

module.exports = internals.connect(FaceHeader);
