const React = require('react');
const Header = require('components/Header');

module.exports = {

    screen: require('./containers/ResetPassword'),
    path: 'reset-password',
    navigationOptions: ({ navigation }) => ({

        header: (<Header goBack={navigation.goBack} title='Reset Password' />)
    })
};
