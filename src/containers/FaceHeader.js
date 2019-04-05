const Connect = require('react-redux').connect;
const Header = require('components/Header');

const internals = {
    hasFace: (faces) => {   // TODO: complete this selector (and put it in a logical place)


    }
};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        hasFace: state.kegbot.faces !== null  // TODO: use the new selector which should be based off the face timestamp (or keep it how it is? -- what benifit do we get by keeping around a reference to an expired face?)
    })
);

// Hook them up to the login
module.exports = internals.connect(Header);
