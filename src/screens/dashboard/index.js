const React = require('react');
const DefaultHeader = require('components/DefaultHeader');

module.exports = {
    screen: require('./containers/Dashboard'),
    path: 'dashboard',
    navigationOptions: ({ navigation }) => ({

        header: (<DefaultHeader goBack={() => navigation.navigate('Home')} title='Dashboard' />)
    })
};
