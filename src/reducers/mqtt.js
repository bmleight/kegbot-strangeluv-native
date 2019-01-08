const MqttTypes = require('action-types/mqtt');

const internals =  {};

module.exports = (state, action) => {

    state = state || internals.initial();

    const { type } = action;

    switch (type) {

        case MqttTypes.CONNECTED:

            return { connected: true };

        case MqttTypes.DISCONNECTED:

            return { connected: false };
    }

    return state;
};

internals.initial = () => ({
    connected: false
});
