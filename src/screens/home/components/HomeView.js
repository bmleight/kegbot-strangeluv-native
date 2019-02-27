const React = require('react');
const T = require('prop-types');
const { CardItem } = require('native-base');
const { Card, Container, Text } = require('styles');
const { Joystick } = require('joystick-component-lib');
const { Button } = require('styles');

module.exports = class HomeView extends React.PureComponent {

    static propTypes = {
        setMotors: T.func.isRequired,
        connect: T.func.isRequired,
        disconnect: T.func.isRequired,
        isConnected: T.bool.isRequired,
        battery: T.number.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            px: 0,
            py: 0,
            dx: 0,
            dy: 0
        };

        this.handleDrag = this._handleDrag.bind(this);
        this.handleDragRelease = this._handleDragRelease.bind(this);
    }

    _handleDrag({ dx, dy }) {

        this.props.setMotors(this.state.px + dx, this.state.py + dy);
        this.setState({
            dx,
            dy
        });
    }

    _handleDragRelease({ dx, dy }) {

        this.props.setMotors(0, 0);
        this.setState({
            px: 0,
            py: 0,
            dx: 0,
            dy: 0
        });
    }

    render() {

        return (

            <Container>
                <Card>
                    <CardItem header bordered>
                        <Text>Drive ({this.props.isConnected ? 'connected' : 'not connected'})</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text>Debug info: ({Math.floor(this.state.px + this.state.dx)}, {Math.floor(this.state.py + this.state.dy)}) Battery: {this.props.battery}</Text>
                        <Button
                            onPress={this.props.isConnected ? this.props.disconnect : this.props.connect}
                            text={this.props.isConnected ? 'Disconnect' : 'Connect'}
                            block
                            rounded
                        />
                    </CardItem>
                    <CardItem bordered>
                        <Container>
                            <Joystick
                                shape='circular'
                                length={100}
                                neutralPointX={100}
                                neutralPointY={100}
                                onDraggableMove={this.handleDrag}
                                onDraggableRelease={this.handleDragRelease}
                                isSticky
                            />
                        </Container>
                    </CardItem>
                </Card>
            </Container>
        );
    }
};
