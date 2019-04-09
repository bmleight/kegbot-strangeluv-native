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

        case KegbotTypes.FOUND_FACE:

            return {
                ...state,
                faces: payload.faces
            };
    }

    return state;
};

internals.initial = () => ({
    velocityX: 0,
    velocityY: 0,
    battery: null,
    faces: null
    // faces: {
    //     timestamp: new Date().getTime(),
    //     faces: [{
    //         confidence: 0.984375,
    //         joy: 0.0077,
    //         boundingBox: [ 579, 60, 409, 409 ]
    //     }]
    // }
});
