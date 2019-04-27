const Connect = require('react-redux').connect;
const KegbotActions = require('actions/kegbot');
const FaceSocketActions = require('actions/face-socket');
const HomeView = require('../components/HomeView');

const internals = {};

internals.connect = Connect(
    (state) => ({
        power: state.kegbot.power,
        isConnected: state.mqtt.connected,
        isFaceSocketConnected: state.faces.connected,
        isFaceSocketConnectionPending: state.faces.connectionPending,
        videoWidth: state.faces.videoWidth,
        videoHeight: state.faces.videoHeight,
        videoFaces: state.faces.faces
    }),
    {
        setMotors: KegbotActions.setMotors,
        setPower: KegbotActions.setPower,
        connectFaceSocket: FaceSocketActions.connect
    }
);

module.exports = internals.connect(HomeView);
