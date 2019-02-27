const Connect = require('react-redux').connect;
const AuthSelectors = require('selectors/auth');
const AuthAct = require('actions/auth');
const KegbotActions = require('actions/kegbot');
const MqttActions = require('actions/mqtt');
const HomeView = require('../components/HomeView');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        isAuthenticated: AuthSelectors.getIsAuthenticated(state),
        isConnected: state.mqtt.connected,
        battery: state.kegbot.battery
    }),
    {
        logout: AuthAct.logout,
        drive: KegbotActions.drive,
        setMotors: KegbotActions.setMotors,
        connect: MqttActions.connect,
        disconnect: MqttActions.disconnect
    }
);

// Hook them up to the login
module.exports = internals.connect(HomeView);
