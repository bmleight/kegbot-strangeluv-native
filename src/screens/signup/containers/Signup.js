const Connect = require('react-redux').connect;
const AuthAct = require('actions/auth');
const Signup = require('../components/Signup');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        authError: state.auth.error.message
    }),
    {
        signup: AuthAct.registerUser,
        clearErrors: AuthAct.clearErrors
    }
);

// Hook them up to the login
module.exports = internals.connect(Signup);
