const React = require('react');
const Header = require('components/Header');

module.exports = {

    screen: require('./containers/Signup'),
    path: 'signup',
    navigationOptions: ({ navigation }) => ({

        header: (<Header goBack={navigation.goBack} title='Signup' />)
    })
};
