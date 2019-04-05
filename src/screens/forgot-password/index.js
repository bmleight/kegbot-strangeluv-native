const React = require('react');
const Header = require('components/Header');

module.exports = {

    screen: require('./containers/ForgotPassword'),
    path: 'forgot-password',
    navigationOptions: ({ navigation }) => ({

        header: (<Header goBack={navigation.goBack} title='Forgot Password' />)
    })
};
