const Client = require('../utils/mqtt-client');
const MqttActions = require('../actions/mqtt');

module.exports = (store) => {

    Client.on('connectionLost', (responseObject) => {

        store.dispatch(MqttActions.disconnected());
    });

    store.dispatch(MqttActions.connect());
};
