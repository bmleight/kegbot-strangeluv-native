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

        case KegbotTypes.SET_POWER:

            return {
                ...state,
                power: payload.power
            };

        case KegbotTypes.SET_BATTERY:

            return {
                ...state,
                battery: payload.volts
            };

        case KegbotTypes.FOUND_FACE:

            return {
                ...state,
                faces: payload.faces
            };

        case KegbotTypes.POUR_START:

            return {
                ...state,
                isPouring: true
            };

        case KegbotTypes.POUR_END:

            return {
                ...state,
                isPouring: false
            };
    }

    return state;
};

internals.initial = () => ({
    velocityX: 0,
    velocityY: 0,
    power: 0.4,
    battery: null,
    // battery: 25,
    faces: null,
    isPouring: false
    // faces: {
    //     timestamp: new Date().getTime(),
    //     faces: [{
    //         confidence: 0.984375,
    //         joy: 0.0077,
    //         boundingBox: [579, 60, 409, 409]
    //     }]
    // }
});
