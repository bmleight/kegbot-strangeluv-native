const Connect = require('react-redux').connect;
const KegbotActions = require('actions/kegbot');
const HomeView = require('../components/HomeView');

const internals = {};

internals.connect = Connect(
    (state) => ({
        power: state.kegbot.power,
        isConnected: state.mqtt.connected
    }),
    {
        setMotors: KegbotActions.setMotors,
        setPower: KegbotActions.setPower
    }
);

module.exports = internals.connect(HomeView);
