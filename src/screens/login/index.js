const React = require('react');
const DefaultHeader = require('components/DefaultHeader');

module.exports = {

    screen: require('./containers/Login'),
    path: 'login',
    navigationOptions: ({ navigation }) => ({

        header: (<DefaultHeader goBack={navigation.goBack} title='Login' />)
    })
};
