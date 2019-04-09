const React = require('react');
const FaceHeader = require('containers/FaceHeader');

module.exports = {

    screen: require('./containers/Signup'),
    path: 'signup',
    navigationOptions: ({ navigation }) => ({

        header: (<FaceHeader goBack={navigation.goBack} title='Signup' />)
    })
};
