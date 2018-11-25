const Client = require('../utils/mqtt-client');

module.exports = (store) => {

    Client
    .connect()
    .then(() => {

        return Client.subscribe('kegbot');
    })
    .catch((responseObject) => {

        console.warn('catch mqtt intializer');
        if (responseObject.errorCode !== 0) {
            console.warn('onConnectionLost: ' + responseObject.errorMessage);
        }
    });
};
