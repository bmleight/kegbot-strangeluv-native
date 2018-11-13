const React = require('react');
const DefaultHeader = require('components/DefaultHeader');

module.exports = {

    screen: require('./containers/ResetPassword'),
    path: 'reset-password',
    navigationOptions: ({ navigation }) => ({

        header: (<DefaultHeader goBack={navigation.goBack} title='Reset Password' />)
    })
};
