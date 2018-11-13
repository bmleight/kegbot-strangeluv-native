const React = require('react');
const DefaultHeader = require('components/DefaultHeader');

module.exports = {

    screen: require('./containers/Signup'),
    path: 'signup',
    navigationOptions: ({ navigation }) => ({

        header: (<DefaultHeader goBack={navigation.goBack} title='Signup' />)
    })
};
