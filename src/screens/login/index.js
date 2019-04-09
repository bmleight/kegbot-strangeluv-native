const React = require('react');
const FaceHeader = require('containers/FaceHeader');

module.exports = {

    screen: require('./containers/Login'),
    path: 'login',
    navigationOptions: ({ navigation }) => ({

        header: (<FaceHeader goBack={navigation.goBack} title='Login' />)
    })
};
