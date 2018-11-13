const Connect = require('react-redux').connect;
const AuthAct = require('actions/auth');
const Login = require('../components/Login');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        authError: state.auth.error.message
    }),
    {
        login: AuthAct.login,
        clearErrors: AuthAct.clearErrors
    }
);

// Hook them up to the login
module.exports = internals.connect(Login);
