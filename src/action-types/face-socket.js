const KeyMirror = require('keymirror');

module.exports = KeyMirror({
    FACE_SOCKET_CONNECT_START: true,
    FACE_SOCKET_CONNECT_SUCCESS: true,
    FACE_SOCKET_ERROR: true,
    FACE_SOCKET_DISCONNECT_START: true,
    FACE_SOCKET_DISCONNECT_SUCCESS: true,
    FACE_SOCKET_NEW_CODEC_DATA: true,
    FACE_SOCKET_NEW_FACE_DATA: true
});
