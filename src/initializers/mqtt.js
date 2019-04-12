const Client = require('../utils/mqtt-client');
const MqttActions = require('../actions/mqtt');
const KegbotActions = require('../actions/kegbot');

const internals = {
    clearFaceTimeout: null
};

module.exports = (store) => {

    Client.on('connectionLost', (responseObject) => {

        store.dispatch(MqttActions.disconnectSuccess());
    });

    Client.on('messageReceived', (message) => {

        switch (message.destinationName) {

            case 'hackbot/status':

                const payload = JSON.parse(message.payloadString);
                store.dispatch(KegbotActions.setBattery(payload.battery / 10));
                break;

            case 'hackbot/faces':

                const faces = internals.convertFaces(JSON.parse(message.payloadString));
                store.dispatch(KegbotActions.foundFace(faces));

                // ALTERNATIVELY I COULD USE A SELECTOR TO DETERMINE IF THERE IS AN ACTIVE FACE -- this seems a little cleaner...?
                if (internals.clearFaceTimeout) {
                    clearTimeout(internals.clearFaceTimeout);
                }

                internals.clearFaceTimeout = setTimeout(() => {

                    store.dispatch(KegbotActions.foundFace(null));
                }, 1000);
                break;

        }
    });

    store.dispatch(MqttActions.connect());
};

internals.convertFaces = (rawFaces) => {

    const converted = rawFaces.map((face) => {

        return {
            confidence: face[0],
            joy: face[1],
            boundingBox: face[2]
        };
    });

    return {
        timestamp: new Date(),
        faces: converted
    };
};
