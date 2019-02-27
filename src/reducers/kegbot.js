const KegbotTypes = require('action-types/kegbot');

const internals =  {};

module.exports = (state, action) => {

    state = state || internals.initial();

    const { type, payload } = action;

    switch (type) {

        case KegbotTypes.SET_MOTORS:

            return {
                ...state,
                velocityX: payload.x,
                velocityY: payload.y
            };

        case KegbotTypes.SET_BATTERY:

            return {
                ...state,
                battery: payload.volts
            };
    }

    return state;
};

internals.initial = () => ({
    velocityX: 0,
    velocityY: 0,
    battery: 0
});
