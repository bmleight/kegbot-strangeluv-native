const React = require('react');
const T = require('prop-types');
const { Header, Body, Right, Button, Icon, Title, Text } = require('native-base');

module.exports = class FaceHeader extends React.PureComponent {

    static propTypes = {
        hasFace: T.bool,
        isConnected: T.bool,
        title: T.string,
        battery: T.number.isRequired,
        disconnect: T.func,
        connect: T.func
    };

    render() {

        const { title, hasFace, battery, isConnected, connect, disconnect } = this.props;

        let batteryIcon = 'battery-empty';

        if (battery > 26) {
            batteryIcon = 'battery-full';
        }
        else if (battery > 25) {
            batteryIcon = 'battery-three-quarters';
        }
        else if (battery > 24) {
            batteryIcon = 'battery-half';
        }
        else if (battery > 23) {
            batteryIcon = 'battery-quarter';
        }

        const batteryTextStyle = { marginRight: 5 };

        const batteryIconStyles = {
            fontSize: 20,
            color: isConnected ? 'green' : 'red'
        };

        const defaultIconStyles = {
            fontSize: 20,
            color: 'white'
        };

        return (
            <Header {...this.props}>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Text style={batteryTextStyle}>{battery}</Text>
                        <Icon type='FontAwesome' name={batteryIcon} style={defaultIconStyles} />
                    </Button>
                    <Button transparent onPress={isConnected ? disconnect : connect}>
                        <Icon type='FontAwesome' name='check-circle' style={batteryIconStyles} />
                    </Button>
                    {hasFace &&
                        <Button transparent>
                            <Icon name='person' style={defaultIconStyles} />
                        </Button>
                    }
                </Right>
            </Header>
        );
    }
};
