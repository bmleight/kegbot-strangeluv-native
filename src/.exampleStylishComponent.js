const React = require('react');
const PropTypes = require('prop-types');
const { Text } = require('native-base');
const { ScrollView } = require('styles');

module.exports = class Stylish extends React.PureComponent {

    static propTypes = {};

    render() {

        return (
            <ScrollView>
                <Text>Welcome!</Text>
            </ScrollView>
        );
    }
}
