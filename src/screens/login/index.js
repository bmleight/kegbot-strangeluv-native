const React = require('react');
const Header = require('components/Header');

module.exports = {

    screen: require('./containers/Login'),
    path: 'login',
    navigationOptions: ({ navigation }) => ({

        header: (<Header goBack={navigation.goBack} title='Login' />)
    })
};
