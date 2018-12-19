const Client = require('../utils/mqtt-client');
const MqttActions = require('../actions/mqtt');

module.exports = (store) => {

    // console.warn('test');
    Client.on('connectionLost', (responseObject) => {

        // console.warn(responseObject);
        store.dispatch(MqttActions.disconnected());
    });

    Client
    .connect()
    .then(() => {

        // console.warn('connect then');
        store.dispatch(MqttActions.connected());
    })
    .catch((responseObject) => {

        // responseObject.forEach((key) => {
        //
        //     console.warn(key);
        //     console.warn(responseObject[key]);
        // });

        store.dispatch(MqttActions.disconnected());
    });
};
