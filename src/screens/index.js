const Login = require('./login');
const Signup = require('./signup');
const Home = require('./home');
const Dashboard = require('./dashboard');
const ForgotPassword = require('./forgot-password');
const ResetPassword = require('./reset-password');

// This is our main route config,
// to have a single place to collect
// our screens and configure their
// relationships via other navigators

module.exports = (store) => {

    return {
        routeConfig: {
            Home,
            Signup,
            Login,
            Dashboard,
            ForgotPassword,
            ResetPassword
        },
        initialRouteName: 'Home'
    };
};
