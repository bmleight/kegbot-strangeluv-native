const FaceSocketTypes = require('action-types/face-socket');

const internals =  {};

module.exports = (state, action) => {

    state = state || internals.initial();

    const { type, payload } = action;

    // console.warn(type);

    switch (type) {

        case FaceSocketTypes.FACE_SOCKET_NEW_CODEC_DATA:

            return {
                ...state,
                videoWidth: payload.width,
                videoHeight: payload.height
            };

        case FaceSocketTypes.FACE_SOCKET_CONNECT_START:
        case FaceSocketTypes.FACE_SOCKET_DISCONNECT_START:

            return {
                ...state,
                connectionPending: true
            };

        case FaceSocketTypes.FACE_SOCKET_ERROR:

            return {
                ...state,
                connectionPending: false
            };

        case FaceSocketTypes.FACE_SOCKET_CONNECT_SUCCESS:

            return {
                ...state,
                connected: true,
                connectionPending: false
            };

        case FaceSocketTypes.FACE_SOCKET_DISCONNECT_SUCCESS:

            return {
                ...state,
                connected: false,
                connectionPending: false,
                videoWidth: null,
                videoHeight: null,
                faces: null
            };

        case FaceSocketTypes.FACE_SOCKET_NEW_FACE_DATA:

            return {
                ...state,
                faces: payload
            };
    }

    return state;
};

internals.initial = () => ({
    connected: false,
    connectionPending: false,
    videoWidth: 400,
    videoHeight: 400,
    face: null
});
