const React = require('react');
const FaceHeader = require('containers/FaceHeader');

module.exports = {

    screen: require('./containers/Home'),
    path: 'home',
    navigationOptions: {
        header: (<FaceHeader title='Kegbot' />)
    }
};
