const React = require('react');
const T = require('prop-types');
const { Container, Content, Card, CardItem, Footer, FooterTab, Text, Button, Icon } = require('native-base');
const { Thumbnail, Left, Right, Body } = require('native-base');
const Video = require('react-native-video').default;
const { Joystick } = require('joystick-component-lib');
const Slider = require('@react-native-community/slider');

module.exports = class HomeView extends React.PureComponent {

    static propTypes = {
        setMotors: T.func.isRequired,
        setPower: T.func.isRequired,
        isConnected: T.bool.isRequired,
        power: T.number.isRequired
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

        const styles = { flex: 0 };

        return (
            <Card style={styles}>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../../images/hop-orange.png')} />
                        <Body>
                            <Text>Citra Bret IPA</Text>
                            <Text note>Great Dane Brewing</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text note>34 IBUs</Text>
                    </Left>
                    <Right>
                        <Text note>5%</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            Brewed with classic American hops; Cascade, Centennial and Citra, this West Coast Session IPA is bursting with citrus flavors.
                            The base beer is Northern Brewers Kama Citra IPA, then aged on brettanemyces, and finally dosed with hop terpines from
                            Maineniacal Yeast Company.
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }

    renderDrive() {

        const containerStyles = {
            marginTop: 150,
            marginLeft: 50
        };

        const dragStyles = {
            height: 50,
            width: 50
        };

        const backgroundStyles = {
            borderWidth: 3
        };

        const sliderStyles = {
            width: 200,
            height: 40,
            marginTop: 275
        };

        return (
            <Card>
                <CardItem bordered>
                    <Container style={containerStyles}>
                        {this.props.isConnected &&
                            <>
                                <Joystick
                                    shape='circular'
                                    length={100}
                                    neutralPointX={100}
                                    neutralPointY={100}
                                    onDraggableMove={this.handleDrag}
                                    onDraggableRelease={this.handleDragRelease}
                                    isSticky
                                    draggableStyle={dragStyles}
                                    backgroundStyle={backgroundStyles}
                                />
                                <Slider
                                    style={sliderStyles}
                                    minimumValue={0}
                                    maximumValue={1}
                                    step={0.05}
                                    minimumTrackTintColor='#000000'
                                    maximumTrackTintColor='#CCCCCC'
                                    value={this.props.power}
                                    onValueChange={this.props.setPower}
                                />
                            </>
                        }
                        {!this.props.isConnected && <Text>
                            Please connect to kegbot by touching the red checkbox in the header
                        </Text>}
                    </Container>
                </CardItem>
            </Card>
        );
    }

    renderVideo() {

        const backgroundStyles = {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };

        // <Video
        //     source={require('../assets/char-star.mp4')}
        //     // source={{ uri:'http://192.168.86.39:4664' }}
        //     style={backgroundStyles}
        // />

        return (
            <Container>
                <Text>Video feed from kegbot coming soon...</Text>
            </Container>
        );
    }

    render() {

        return (

            <Container>
                <Content scrollEnabled={false}>
                    {this.state.view === 'beer' && this.renderBeerInfo()}
                    {this.state.view === 'drive' && this.renderDrive()}
                    {this.state.view === 'video' && this.renderVideo()}
                </Content>
                <Footer>
                    <FooterTab>
                        <Button active={this.state.view === 'beer'} onPress={() => this.setState({ view: 'beer' })}>
                            <Icon name='beer' />
                        </Button>
                        <Button active={this.state.view === 'drive'} onPress={() => this.setState({ view: 'drive' })}>
                            <Icon name='car' />
                        </Button>
                        <Button active={this.state.view === 'video'} onPress={() => this.setState({ view: 'video' })}>
                            <Icon name='videocam' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
};
