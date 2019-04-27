const FaceSocketTypes = require('../action-types/face-socket');
const ClientFactory = require('../utils/face-socket-factory');
const proto = require('../utils/messages_pb.js');

const internals = {
    client: null
};

const actions = exports;

exports.connectStart = () => ({
    type: FaceSocketTypes.FACE_SOCKET_CONNECT_START
});

exports.connectSuccess = () => ({
    type: FaceSocketTypes.FACE_SOCKET_CONNECT_SUCCESS
});

exports.error = () => ({
    type: FaceSocketTypes.FACE_SOCKET_ERROR
});

exports.disconnectStart = () => ({
    type: FaceSocketTypes.FACE_SOCKET_DISCONNECT_START
});

exports.disconnectSuccess = () => ({
    type: FaceSocketTypes.FACE_SOCKET_DISCONNECT_SUCCESS
});

exports.newCodecData = (payload) => ({
    type: FaceSocketTypes.FACE_SOCKET_NEW_CODEC_DATA,
    payload
});

exports.newFaceData = (payload) => ({
    type: FaceSocketTypes.FACE_SOCKET_NEW_FACE_DATA,
    payload
});

internals.convertFaces = (rawFaces) => {

    const converted = rawFaces.map((face) => {

        let faceString = 'n/a';

        switch (face.getElementCase()) {
            case proto.InferenceElement.ElementCase.RECTANGLE:
                const rect = face.getRectangle();
                faceString = `[X: ${rect.getX()}, Y: ${rect.getY()}, W: ${rect.getW()}, H: ${rect.getH()}]`;
                break;
            case proto.InferenceElement.ElementCase.LABEL:
                const label = face.getLabel();
                faceString = label.getText() + `[X: ${label.getX()}, Y: ${label.getY()}, Size: ${label.getSize()}]`;
                break;
            default:
                // Ignore.
                break;
        }

        return {
            faceString
        };
    });

    return converted;
};

exports.connect = () => {

    return (dispatch) => {

        dispatch(actions.connectStart());

        if (internals.client === null) {
            // console.warn('creating new client');
            internals.client = ClientFactory();
            internals.client.onopen = () => {

                const message = new proto.AiyBound();
                const sc = new proto.StreamControl();
                sc.setEnabled(true);
                message.setStreamControl(sc);
                internals.client.send(message.serializeBinary());
                dispatch(actions.connectSuccess());
            };

            internals.client.onmessage = (event) => {

                const message = proto.ClientBound.deserializeBinary(event.data);
                switch (message.getMessageCase()) {
                    case proto.ClientBound.MessageCase.STREAM_DATA:

                        const data = message.getStreamData();
                        switch (data.getTypeCase()) {

                            case proto.StreamData.TypeCase.CODEC_DATA:

                                const codecData = data.getCodecData();

                                dispatch(actions.newCodecData({
                                    width: codecData.getWidth(),
                                    height: codecData.getHeight()
                                }));
                                break;

                            case proto.StreamData.TypeCase.FRAME_DATA:

                                // handle_frame_data(data.getFrameData());

                                // g_player.decode(data.getData_asU8());
                                // const new_seq = data.getSeq();
                                // const prev_seq = g_last_frame_seq;
                                // g_last_frame_seq = new_seq;
                                // if (prev_seq > 0) {
                                // const dropped = new_seq - prev_seq - 1;
                                // if (dropped) {
                                // console.warn('Dropped ' + dropped + ' frames');
                                // }
                                // }

                                // console.warn('FRAME_DATA');

                                break;
                            case proto.StreamData.TypeCase.INFERENCE_DATA:

                                const inferenceData = data.getInferenceData();
                                const inferenceList = inferenceData.getElementsList();

                                const faceData = internals.convertFaces(inferenceList);

                                dispatch(actions.newFaceData(faceData));
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            };

            internals.client.onerror = (e) => {
                // an error occurred
                console.warn('on error');
                console.warn(e.message);
                console.warn(e);
                dispatch(actions.error());
            };

            internals.client.onclose = (e) => {
                // connection closed
                console.warn('on close');
                console.warn(e.code, e.reason);
                dispatch(actions.disconnectSuccess());
                internals.client = null;
            };
        }

        // Client
        // .connect()
        // .then(() => {
        //
        //     // Client.subscribe('hackbot/*');  // TODO: does this work?
        //     Client.subscribe('hackbot/status');
        //     Client.subscribe('hackbot/faces');
        //     dispatch(actions.connectSuccess());
        // })
        // .catch((responseObject) => {
        //
        //     dispatch(actions.connectFail());
        // });
    };
};

exports.disconnect = () => {

    return (dispatch) => {

        dispatch(actions.disconnectStart());

        internals.client.close();

        // Client
        // .disconnect()
        // .catch((responseObject) => {
        //
        //     dispatch(actions.disconnectFail());
        // });
    };
};
