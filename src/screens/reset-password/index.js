const React = require('react');
const FaceHeader = require('containers/FaceHeader');

module.exports = {

    screen: require('./containers/ResetPassword'),
    path: 'reset-password',
    navigationOptions: ({ navigation }) => ({

        header: (<FaceHeader goBack={navigation.goBack} title='Reset Password' />)
    })
};
