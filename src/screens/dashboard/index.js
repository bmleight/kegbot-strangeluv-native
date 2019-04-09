const React = require('react');
const FaceHeader = require('containers/FaceHeader');

module.exports = {
    screen: require('./containers/Dashboard'),
    path: 'dashboard',
    navigationOptions: ({ navigation }) => ({

        header: (<FaceHeader goBack={() => navigation.navigate('Home')} title='Dashboard' />)
    })
};
