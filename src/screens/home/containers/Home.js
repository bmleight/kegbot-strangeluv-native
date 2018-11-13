const Connect = require('react-redux').connect;
const AuthSelectors = require('selectors/auth');
const AuthAct = require('actions/auth');
const HomeView = require('../components/HomeView');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        isAuthenticated: AuthSelectors.getIsAuthenticated(state)
    }),
    {
        logout: AuthAct.logout
    }
);

// Hook them up to the login
module.exports = internals.connect(HomeView);
