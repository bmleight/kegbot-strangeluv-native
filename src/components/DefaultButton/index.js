const React = require('react');
const T = require('prop-types');
const { Icon, Text, Button } = require('native-base');

module.exports = class DefaultButton extends React.PureComponent {

    static propTypes = {
        icon: T.string,
        text: T.string,
        onPress: T.func.isRequired,
        iconColor: T.string
    };

    render() {

        return (

            <Button {...this.props}>
                {this.props.icon &&
                    <Icon name={this.props.icon} color={this.props.iconColor} />
                }
                {this.props.text &&
                    <Text>
                        {this.props.text}
                    </Text>
                }
            </Button>
        );
    }
};
