const StrangeAuth = require('strange-auth');
const WebClient = require('utils/web-client');
const AuthAct = require('action-types/auth');
const NavigationService = require('navigators/navigation-service');

const internals = {};

const actions = exports;

// New User Registration
exports.registrationRequest = (payload) => ({
    type: AuthAct.REGISTRATION_BEGIN,
    payload
});

exports.registrationSuccess = (data) => ({
    type: AuthAct.REGISTRATION_SUCCESS,
    payload: data
});

exports.registrationFailure = (errMessage) => ({
    type: AuthAct.REGISTRATION_FAILURE,
    payload: errMessage
});

exports.clearErrors = () => ({
    type: AuthAct.CLEAR_AUTH_ERRORS
});

exports.registerUser = ({ email, password, firstName, lastName }) => {

    return (dispatch) => {

        dispatch(actions.registrationRequest({ email, password, firstName, lastName }));

        const newUser = WebClient.post('/users', { email, password, firstName, lastName });

        newUser
        .then(({ response }) => {

            dispatch(actions.registrationSuccess(response));
            dispatch(actions.login({ email, password }));
        })
        .catch((err) => {

            let errMessage = 'Signup failed. Please try again.';

            if (typeof err.response !== 'undefined') {
                errMessage = err.response.data.message;
            }

            dispatch(actions.registrationFailure(errMessage));
        });
    };
};

// Login and Logout
exports.login = ({ email, password, token }) => {

    return (dispatch) => {

        return dispatch(internals.strangeActions.login({ email, password, token }))
        .then((result) => {

            NavigationService.reset('Dashboard');
        })
        .catch((ignoreErr) => {});
    };
};

exports.logout = () => {

    return (dispatch) => {

        dispatch(internals.strangeActions.logout());
        NavigationService.reset('Home');
    };
};

// Request Reset & Reset Password

exports.requestResetRequest = ({ args }) => ({
    // We're not doing anything with the payload in this recipe
    type: AuthAct.REQUEST_PASSWORD_RESET_BEGIN,
    payload: args
});

exports.requestResetSuccess = (data) => ({
    // We're not doing anything with the payload in this recipe
    type: AuthAct.REQUEST_PASSWORD_RESET_SUCCESS,
    payload: data
});

exports.requestResetFailure = (errMessage) => ({
    type: AuthAct.REQUEST_PASSWORD_RESET_FAILURE,
    payload: errMessage
});

exports.resetPasswordRequest = ({ args }) => ({
    // We're not doing anything with the payload in this recipe
    type: AuthAct.RESET_PASSWORD_BEGIN,
    payload: args
});

exports.resetPasswordSuccess = (data) => ({
    // We're not doing anything with the payload in this recipe
    type: AuthAct.RESET_PASSWORD_SUCCESS,
    payload: data
});

exports.resetPasswordFailure = (errMessage) => ({
    type: AuthAct.RESET_PASSWORD_FAILURE,
    payload: errMessage
});

exports.requestPasswordReset = ({ email }) => {

    return (dispatch) => {

        dispatch(actions.requestResetRequest({ email }));

        return WebClient.post('/users/request-reset-mobile', { email }, { responseType: 'text' })

        .then(({ data, status }) => {

            dispatch(actions.requestResetSuccess(data));
            // TODO Possible to display success message on new screen?
            NavigationService.navigate('Login');
        })
        .catch((err) => {

            let errMessage = 'Unable to reset password. Please try again';

            if (typeof err.response !== 'undefined') {
                errMessage = err.response.data.message;
            }

            dispatch(actions.requestResetFailure(errMessage));
        });
    };
};

exports.resetPassword = (email, newPassword, resetToken) => {

    return (dispatch) => {

        dispatch(actions.resetPasswordRequest({ email, newPassword, resetToken }));

        return WebClient.post('/users/reset-password-mobile', { email, newPassword, resetToken }, { responseType: 'text' })

        .then(({ data, status }) => {

            dispatch(actions.resetPasswordSuccess(data));
            dispatch(actions.login({ email, password: newPassword }));
            // TODO Need to navigate anywhere after this?
        })
        .catch((err) => {

            let errMessage = 'Unable to reset password. Please try again.';

            if (typeof err.response !== 'undefined') {
                errMessage = err.response.data.message;
            }

            dispatch(actions.resetPasswordFailure(errMessage));
        });
    };
};

// StrangeAuth
internals.strangeActions = StrangeAuth.makeActions({
    login: ({ email, password, token }) => {

        const getToken = () => {

            if (token) {
                return Promise.resolve(token);
            }

            return WebClient.post('/login', { email, password }, { responseType: 'text' })
            .then(({ data }) => data);
        };

        let finalToken;

        return getToken()
        .then((result) => {

            finalToken = result;
            return internals.getUser(finalToken);
        })
        .then(({ data }) => {

            return {
                credentials: {
                    token: finalToken,
                    user: data
                }
            };
        });
    }
});

internals.getUser = (token) => {

    return WebClient.get('/user', {
        headers: { authorization: `Bearer ${token}` }
    });
};
