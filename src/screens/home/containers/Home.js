const Connect = require('react-redux').connect;
const KegbotActions = require('actions/kegbot');
const HomeView = require('../components/HomeView');

const internals = {};

internals.connect = Connect(
    (state) => ({
        isConnected: state.mqtt.connected
    }),
    {
        drive: KegbotActions.drive,
        setMotors: KegbotActions.setMotors
    }
);

module.exports = internals.connect(HomeView);
