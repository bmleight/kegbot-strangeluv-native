const MqttTypes = require('action-types/mqtt');

const internals =  {};

module.exports = (state, action) => {

    state = state || internals.initial();

    const { type } = action;

    switch (type) {

        case MqttTypes.CONNECT_START:
        case MqttTypes.DISCONNECT_START:

            return {
                ...state,
                connectionPending: true
            };

        case MqttTypes.CONNECT_FAILURE:
        case MqttTypes.DISCONNECT_FAILURE:

            return {
                ...state,
                connectionPending: false
            };

        case MqttTypes.CONNECT_SUCCESS:

            return {
                ...state,
                connected: true,
                connectionPending: false
            };

        case MqttTypes.DISCONNECT_SUCCESS:

            return {
                ...state,
                connected: false,
                connectionPending: false
            };
    }

    return state;
};

internals.initial = () => ({
    connected: false,
    connectionPending: false
});
