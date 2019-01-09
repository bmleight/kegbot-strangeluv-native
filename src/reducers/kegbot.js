const KegbotTypes = require('action-types/kegbot');

const internals =  {};

module.exports = (state, action) => {

    state = state || internals.initial();

    const { type, payload } = action;

    switch (type) {

        case KegbotTypes.SET_MOTORS:

            return { velocityX: payload.x, velocityY: payload.y };
    }

    return state;
};

internals.initial = () => ({
    velocityX: 0,
    velocityY: 0
});
