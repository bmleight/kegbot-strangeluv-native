const React = require('react');
const Header = require('components/Header');

module.exports = {
    screen: require('./containers/Dashboard'),
    path: 'dashboard',
    navigationOptions: ({ navigation }) => ({

        header: (<Header goBack={() => navigation.navigate('Home')} title='Dashboard' />)
    })
};
