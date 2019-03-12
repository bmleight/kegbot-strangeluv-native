const Client = require('../utils/mqtt-client');
const MqttActions = require('../actions/mqtt');
const KegbotActions = require('../actions/kegbot');

module.exports = (store) => {

    Client.on('connectionLost', (responseObject) => {

        store.dispatch(MqttActions.disconnected());
    });

    Client.on('messageReceived', (message) => {

        switch (message.destinationName) {
            case 'hackbot/status':
                const payload = JSON.parse(message.payloadString);
                store.dispatch(KegbotActions.setBattery(payload.battery));
        }
    });

    store.dispatch(MqttActions.connect());
};
