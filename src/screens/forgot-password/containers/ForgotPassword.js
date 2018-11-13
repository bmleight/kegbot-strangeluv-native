const Connect = require('react-redux').connect;
const AuthAct = require('actions/auth');
const ForgotPassword = require('../components/ForgotPassword');

const internals = {};

internals.connect = Connect(
    (state) => ({
        errorMessage: state.auth.error.message
    }),
    {
        // TODO Need to define
        requestReset: AuthAct.requestPasswordReset,
        clearErrors: AuthAct.clearErrors
    }
);

module.exports = internals.connect(ForgotPassword);
