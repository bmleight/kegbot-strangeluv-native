const React = require('react');
const T = require('prop-types');
const { Container, Content, Card, CardItem, Footer, FooterTab, Text, Button, Icon } = require('native-base');
// const { ,  } = require('styles');
const { Joystick } = require('joystick-component-lib');
// const {  } = require('styles');

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
            view: 'beer',
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

    renderBeerInfo() {

        return (
            <Card>
                <CardItem header bordered>
                    <Text>Drink Beer!</Text>
                </CardItem>
            </Card>
        );
    }

    renderDrive() {

        return (
            <Card>
                <CardItem header bordered>
                    <Text>Drive ({this.props.isConnected ? 'connected' : 'not connected'})</Text>
                </CardItem>
                <CardItem bordered>
                    <Text>Battery: {this.props.battery}</Text>
                    <Button
                        onPress={this.props.isConnected ? this.props.disconnect : this.props.connect}
                        block
                        rounded
                    >
                        <Text>{this.props.isConnected ? 'Disconnect' : 'Connect'}</Text>
                    </Button>
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
        );
    }

    render() {

        return (

            <Container>
                <Content scrollEnabled={false}>
                    {this.state.view === 'beer' ? this.renderBeerInfo() : this.renderDrive()}
                </Content>
                <Footer>
                    <FooterTab>
                        <Button active={this.state.view === 'beer'} onPress={() => this.setState({ view: 'beer' })}>
                            <Icon name='beer' />
                        </Button>
                        <Button active={this.state.view === 'drive'} onPress={() => this.setState({ view: 'drive' })}>
                            <Icon active name='car' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
};
