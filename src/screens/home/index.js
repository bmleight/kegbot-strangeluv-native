const React = require('react');
const DefaultHeader = require('components/DefaultHeader');

module.exports = {

    screen: require('./containers/Home'),
    path: 'home',
    navigationOptions: {
        header: (<DefaultHeader title='Kegbot' />)
    }
};
