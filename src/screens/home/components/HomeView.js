const React = require('react');
const T = require('prop-types');
const { CardItem } = require('native-base');
const { ScrollView, Card, Container, Text, Button } = require('styles');

module.exports = class HomeView extends React.PureComponent {

    static propTypes = {
        drive: T.func.isRequired
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
                                <Button text='left' onPress={() => this.props.drive('left')} />
                                <Button text='right' onPress={() => this.props.drive('right')} />
                            </Container>
                            <Container>
                                <Button text='forwards' onPress={() => this.props.drive('forwards')} />
                                <Button text='backwards' onPress={() => this.props.drive('backwards')} />
                            </Container>
                        </CardItem>
                    </Card>
                </ScrollView>
            </Container>
        );
    }
};
