const React = require('react');
const T = require('prop-types');
const { Header, Body, Right, Button, Icon, Title, Text, Spinner } = require('native-base');
const Color = require('color');

module.exports = class FaceHeader extends React.PureComponent {

    static propTypes = {
        faces: T.object,
        isConnected: T.bool,
        connectionPending: T.bool,
        title: T.string,
        battery: T.number.isRequired,
        disconnect: T.func,
        connect: T.func
    };

    render() {

        const { title, faces, battery, isConnected, connect, disconnect, connectionPending } = this.props;

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

        let faceIcon = 'meh';
        const faceIconStyles = {
            ...defaultIconStyles
        };
        if (faces) {

            // console.warn(faces.faces[0]);
            const joyScore = faces.faces[0].joy;

            if (joyScore > .9) {
                faceIcon = 'grin-beam';
            }
            else if (joyScore > .8) {
                faceIcon = 'grin';
            }
            else if (joyScore > .7) {
                faceIcon = 'smile';
            }
            else if (joyScore > .4) {
                faceIcon = 'meh';
            }
            else if (joyScore > .2) {
                faceIcon = 'frown-open';
            }
            else {
                faceIcon = 'frown';
            }

            // this will transition the color of the icon based on joy score...needs some tweaking...but maybe?
            // let color = Color('blue');
            // color = color.mix(Color('green'), joyScore);
            // faceIconStyles.color = color.hex();
        }


        return (
            <Header {...this.props}>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {battery &&
                        <Button transparent>
                            <Text style={batteryTextStyle}>{battery}</Text>
                            <Icon type='FontAwesome' name={batteryIcon} style={defaultIconStyles} />
                        </Button>
                    }
                    {!connectionPending &&
                        <Button transparent onPress={isConnected ? disconnect : connect}>
                            <Icon type='FontAwesome' name='check-circle' style={batteryIconStyles} />
                        </Button>
                    }
                    {connectionPending &&
                        <Button transparent>
                            <Spinner style={defaultIconStyles} size='small' color='white' />
                        </Button>
                    }
                    {faces &&
                        <Button transparent>
                            <Icon type='FontAwesome5' name={faceIcon} style={faceIconStyles} />
                        </Button>
                    }
                </Right>
            </Header>
        );
    }
};
