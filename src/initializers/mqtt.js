const Client = require('../utils/mqtt-client');
const MqttActions = require('../actions/mqtt');

module.exports = (store) => {


    Client.on('connectionLost', (responseObject) => {

        store.dispatch(MqttActions.disconnected());
    });

    Client
    .connect()
    .then(() => {

        store.dispatch(MqttActions.connected());
    })
    .catch((responseObject) => {

        store.dispatch(MqttActions.disconnected());
    });
};
