const React = require('react');
const T = require('prop-types');
const { CardItem } = require('native-base');
const { Card, Container, Text } = require('styles');
const { Joystick } = require('joystick-component-lib');

module.exports = class HomeView extends React.PureComponent {

    static propTypes = {
        setMotors: T.func.isRequired,
        isConnected: T.bool.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            px: 0,
            py: 0
        };

        this.handleDrag = this._handleDrag.bind(this);
        this.handleRelease = this._handleRelease.bind(this);
    }

    _handleDrag({ dx, dy }) {

        this.props.setMotors(this.state.px + dx, this.state.py + dy);
        // console.warn(this.state.px + dx, this.state.py + dy);
    }

    _handleRelease({ dx, dy }) {

        // console.warn('release', this.state.px + dx, this.state.py + dy);

        this.setState({ px: this.state.px + dx, py: this.state.py + dy });
    }

    render() {

        return (

            <Container>
                <Card>
                    <CardItem header bordered>
                        <Text>Drive ({this.props.isConnected ? 'connected' : 'not connected'})</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text>Debug info: ({Math.floor(this.state.px)}, {Math.floor(this.state.py)})</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Container>
                            <Joystick
                                shape='circular'
                                length={100}
                                neutralPointX={100}
                                neutralPointY={100}
                                onDraggableMove={this.handleDrag}
                                onDraggableRelease={this.handleRelease}
                            />
                        </Container>
                    </CardItem>
                </Card>
            </Container>
        );
    }
};
