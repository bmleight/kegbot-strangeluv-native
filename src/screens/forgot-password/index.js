const React = require('react');
const FaceHeader = require('containers/FaceHeader');

module.exports = {

    screen: require('./containers/ForgotPassword'),
    path: 'forgot-password',
    navigationOptions: ({ navigation }) => ({

        header: (<FaceHeader goBack={navigation.goBack} title='Forgot Password' />)
    })
};
