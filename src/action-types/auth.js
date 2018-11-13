const KeyMirror = require('keymirror');

module.exports = KeyMirror({
    REGISTRATION_BEGIN: true,
    REGISTRATION_SUCCESS: true,
    REGISTRATION_FAILURE: true,
    LOGIN: true,
    LOGIN_FAIL: true,
    LOGOUT: true,
    REQUEST_PASSWORD_RESET_BEGIN: true,
    REQUEST_PASSWORD_RESET_SUCCESS: true,
    REQUEST_PASSWORD_RESET_FAILURE: true,
    RESET_PASSWORD_BEGIN: true,
    RESET_PASSWORD_SUCCESS: true,
    RESET_PASSWORD_FAILURE: true,
    CLEAR_AUTH_ERRORS: true
});
