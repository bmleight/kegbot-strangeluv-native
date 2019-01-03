const React = require('react');
const T = require('prop-types');
const { CardItem } = require('native-base');
const { ScrollView, Card, Container, Text, Button } = require('styles');

module.exports = class HomeView extends React.PureComponent {

    static propTypes = {
        drive: T.func.isRequired,
        isConnected: T.bool.isRequired
    };

    render() {

        return (

            <Container>
                <ScrollView>
                    <Card>
                        <CardItem header bordered>
                            <Text>Drive</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Container>
                                <Button text='left' onPress={() => this.props.drive('hackbot/drive', { left: -30, right: 30 })} disabled={!this.props.isConnected} />
                                <Button text='right' onPress={() => this.props.drive('hackbot/drive', { left: 30, right: -30 })} disabled={!this.props.isConnected} />
                            </Container>
                            <Container>
                                <Button text='forward' onPress={() => this.props.drive('hackbot/drive', { left: 30, right: 30 })} disabled={!this.props.isConnected} />
                                <Button text='backward' onPress={() => this.props.drive('hackbot/drive', { left: -30, right: -30 })} disabled={!this.props.isConnected} />
                            </Container>
                            <Container>
                                <Button text='fire' onPress={() => this.props.drive('hackbot/fire')} disabled={!this.props.isConnected} />
                            </Container>
                        </CardItem>
                    </Card>
                </ScrollView>
            </Container>
        );
    }
};
