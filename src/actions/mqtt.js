const MqttTypes = require('../action-types/mqtt');

const internals = {};

exports.connected = () => ({
    type: MqttTypes.CONNECTED
});

exports.disconnected = () => ({
    type: MqttTypes.DISCONNECTED
});
