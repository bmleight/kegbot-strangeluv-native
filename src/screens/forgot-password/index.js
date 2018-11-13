const React = require('react');
const DefaultHeader = require('components/DefaultHeader');

module.exports = {

    screen: require('./containers/ForgotPassword'),
    path: 'forgot-password',
    navigationOptions: ({ navigation }) => ({

        header: (<DefaultHeader goBack={navigation.goBack} title='Forgot Password' />)
    })
};
